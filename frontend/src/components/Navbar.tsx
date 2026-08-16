import { Link } from "react-router-dom";
import { useProfile, useLogout } from "../hooks/useAuth";

const Navbar = () => {
    const {
        data: user,
        isLoading,
    } = useProfile();

    const logoutMutation = useLogout();

    const isAuthenticated = !!user;

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">

            {/* Logo */}

            <div className="flex-1">
                <Link
                    to="/"
                    className="btn btn-ghost text-xl"
                >
                    ServicePro
                </Link>
            </div>


            {/* Right Side */}

            <div className="flex-none">

                <ul className="menu menu-horizontal px-5">
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                </ul>


                {/* User */}

                {!isLoading && isAuthenticated && (
                    <div className="dropdown dropdown-end">

                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="flex w-10 items-center justify-center rounded-full border bg-gray-800 font-bold text-white">
                                {user.username
                                    ?.charAt(0)
                                    .toUpperCase() || "U"}
                            </div>
                        </div>


                        {/* Dropdown */}

                        <ul
                            tabIndex={0}
                            className="
                                menu
                                menu-sm
                                dropdown-content
                                z-50
                                mt-3
                                w-52
                                rounded-box
                                bg-base-100
                                p-2
                                shadow
                            "
                        >

                            <li>
                                <Link
                                    to="/profile"
                                    className="justify-between"
                                >
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={logoutMutation.isPending}
                                >
                                    {logoutMutation.isPending
                                        ? "Logging out..."
                                        : "Logout"
                                    }
                                </button>
                            </li>

                        </ul>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Navbar;