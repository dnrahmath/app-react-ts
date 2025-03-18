import { useState, useEffect, useRef, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { ExecuteLocalStorage } from "../tools/LocalStorage";
import { HttpRequest } from "../tools/HttpRequest";
import "bootstrap/dist/css/bootstrap.min.css";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";

interface PageProps {
  auth: {
    user?: any;
  };
}

export default function ScanBarcodeTable({ auth }: PageProps) {
  const localStorageHandler = new ExecuteLocalStorage();
  const apiClient = new HttpRequest();
  const [scannerActive, setScannerActive] = useState(false);
  const qrCodeReaderRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    localStorageHandler.WriteJSON("testKey", { message: "Hello, LocalStorage!" });
    localStorageHandler.ReadJSON<{ message: string }>("testKey")
      .then((storedData) => {
        if (storedData) {
          console.log("LocalStorage Data:", storedData.message);
        }
      })
      .catch((error) => console.error("LocalStorage error:", error));

    return () => {
      if (qrCodeReaderRef.current) {
        qrCodeReaderRef.current.stop().catch((err) =>
          console.error("Error stopping scanner on unmount:", err)
        );
      }
    };
  }, []);

  const startScanner = async () => {
    if (scannerActive) return;
    setScannerActive(true);

    const readerElement = document.getElementById("reader");
    if (!readerElement) {
      console.error("Elemen reader tidak ditemukan.");
      setScannerActive(false);
      return;
    }

    const reader = new Html5Qrcode("reader");
    qrCodeReaderRef.current = reader;

    try {
      await reader.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText: string, decodedResult: Html5QrcodeResult) => {
          console.log("🔹 Barcode terdeteksi:", decodedText);
          console.log("🔹 decodedResult terdeteksi:", decodedResult);
          await reader.stop();
          setScannerActive(false);

          try {
            const jsonObject = JSON.parse(decodedText);
            handleLogin(jsonObject);
          } catch (error) {
            console.error("❌ Gagal mem-parsing JSON dari barcode:", error);
          }
        },
        (errorMessage: string) => {
          console.warn("⚠️ Error QR Code:", errorMessage);
        }
      );
    } catch (error) {
      console.error("❌ Gagal memulai scanner:", error);
      setScannerActive(false);
    }
  };

  const handleLogin = async (jsonObject: any) => {
    console.log("🔹 Handle login dengan barcode:", jsonObject);
    try {
      const response = await apiClient.POST<{ message: string }>("/login", {
        email: jsonObject.email,
        password: jsonObject.password,
      });
      if (response) {
        console.log("✅ Login berhasil, redirecting...");
        window.location.href = "/shopping-cart";
      } else {
        console.error("❌ Login gagal.");
      }
    } catch (error: any) {
      console.error("❌ Error saat login:", error.message);
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const jsonObject = {
      email: "table01@example.com",
      password: "password",
    };
    handleLogin(jsonObject);
  };

  return (
    <div
      style={{
        transform: "scale(0.8)",
        transformOrigin: "top left",
        width: "125%",
        height: "125%",
      }}
    >
      <header className="w-full z-50 bg-gray-50 dark:bg-black text-black/50 dark:text-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <nav className="flex space-x-4">
              {auth.user ? (
                <Link to="/dashboard" className="text-gray-800 dark:text-white">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-800 dark:text-white">
                    Log in
                  </Link>
                  <Link to="/register" className="text-gray-800 dark:text-white">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-black/50 dark:text-white/50">
        <div className="card p-4 w-full max-w-md">
          <h1 className="text-center mb-4">Scan Barcode untuk Login</h1>
          {!scannerActive && (
            <button className="btn btn-primary w-100 mb-3" onClick={startScanner}>
              Izinkan Akses Kamera
            </button>
          )}
          <div
            id="reader"
            style={{
              width: "100%",
              height: "300px",
              display: scannerActive ? "block" : "none",
            }}
          ></div>
          <button className="btn btn-secondary w-100 mt-3" onClick={submit}>
            Lanjutkan Tanpa Scan
          </button>
        </div>
      </main>
    </div>
  );
}
