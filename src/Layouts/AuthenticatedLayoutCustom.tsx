import "bootstrap/dist/css/bootstrap.min.css";
import { PropsWithChildren, ReactNode, useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function AuthenticatedCustom({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const authContext = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Jika AuthContext belum tersedia, tampilkan fallback Loading...
    if (!authContext) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    const { user, logout, login } = authContext;

    // Auto-login hanya jika user masih null
    useEffect(() => {
        if (!user) {
            login({ name: "Nama User", role: "user" });
        }
    }, [user, login]);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className="min-vh-100 bg-light">
            {header && (
                <header className="bg-white shadow-sm p-3 border-bottom">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src="https://o2.funjourney.co.id/assets/images/sites/FJ_logo.png"
                                alt="Fun Journey Logo"
                                className="rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <h2 className="text-dark m-0">Dashboard</h2>
                        </div>
                        <div className="d-flex align-items-center gap-3 ms-auto">
                            <span className="btn btn-light">{user?.name ?? "-"}</span>
                            <a href="#" onClick={() => window.history.back()} className="btn btn-secondary">
                                ← Back
                            </a>
                            <form onSubmit={handleLogout} className="d-inline">
                                <button type="submit" className="btn btn-danger">
                                    🚪 Logout
                                </button>
                            </form>
                            {user?.role !== "user" && (
                                <div className="dropdown">
                                    <button
                                        type="button"
                                        className="btn btn-light dropdown-toggle"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        {user?.name ?? "-"}
                                    </button>
                                    {dropdownOpen && (
                                        <ul className="dropdown-menu show">
                                            <li>
                                                <a className="dropdown-item" href="/profile">
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>
                                                    Log Out
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            )}
            <main className="container mt-4">{children}</main>
        </div>
    );
}
