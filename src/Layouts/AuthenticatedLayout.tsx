import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";

interface AuthenticatedProps {
    header?: ReactNode;
    children: ReactNode;
}

export default function Authenticated({ header, children }: AuthenticatedProps) {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    const handleLogout = async () => {
        await fetch("/logout", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <div className="min-vh-100 bg-light">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link to="/">
                                <img
                                    src="https://o2.funjourney.co.id/assets/images/sites/FJ_logo.png"
                                    alt="Fun Journey Logo"
                                    className="h-20 w-20 p-3"
                                />
                            </Link>
                            <NavLink to="/dashboard" className="ml-10 text-gray-700 hover:text-gray-900">
                                Dashboard
                            </NavLink>
                        </div>

                        {user && (
                            <div className="relative">
                                <button
                                    className="flex items-center bg-white px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {user.name}
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
