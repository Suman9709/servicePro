import { EnvelopeSimpleIcon, SignOutIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
interface SidebarProps {
    maincontent: ReactNode;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    profileImage?: string;
    onLogout?: () => void;
}

const Sidebar = ({
    maincontent,
    username,
    email,
    profileImage,
    first_name,
    last_name,
    onLogout
}: SidebarProps) => {
    const userInitial =
        username?.charAt(0).toUpperCase() || "U";

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Default logout behavior - you can customize this
            console.log("Logout clicked");
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            {/* Drawer checkbox */}
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
            />

            {/* Main content wrapper */}
            <div className="drawer-content flex min-h-screen flex-col">
                {/* Top bar - fixed full width */}
                <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-base-100 shadow-sm ">
                    <div className="flex h-full items-center justify-between px-4">
                        {/* Company name */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold">
                                ServicePro
                            </span>
                        </div>

                        {/* Mobile sidebar button + user avatar */}
                        <div className="flex items-center gap-3">
                            {/* Mobile menu */}
                            <label
                                htmlFor="my-drawer-4"
                                className="btn btn-square btn-ghost lg:hidden"
                            >
                                ☰
                            </label>

                            {/* Logged in user avatar */}
                            <div className="avatar">
                                <div className="w-10 rounded-full border">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={username || "User"}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary font-bold text-primary-content">
                                            {userInitial}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content with padding for fixed header and sidebar */}
                <main className="flex-1 overflow-x-auto pt-16 lg:ml-64">
                    <div className="p-6 bg-white">
                        {maincontent}
                    </div>
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side scrollbar-none">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />

                {/* Sidebar - fixed below top bar */}
                <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-base-100 shadow-lg flex flex-col overflow-hidden">
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                        {/* User information */}
                        <div className="w-[95%] mx-auto p-5 shrink-0 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg shadow-black/10 mt-6">
                            {/* User avatar and name */}
                            <div className="flex items-center gap-4">
                                {/* User avatar with ring */}
                                <div className="avatar">
                                    <div className="w-14 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt={username || "User"}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary-focus font-bold text-primary-content text-xl">
                                                {userInitial}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* User details */}
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-bold text-white truncate">
                                        {first_name} {last_name}
                                    </h1>
                                    <div className="flex items-center gap-1">
                                        <span className="text-primary">@</span>
                                        <h2 className="font-medium text-gray-300 text-sm truncate">
                                            {username || "User"}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="divider my-3 before:bg-white/10 after:bg-white/10"></div>

                            {/* Email */}
                            <div className="flex items-center gap-2 px-1">
                                <div className="text-white/60">
                                    <EnvelopeSimpleIcon size={16} color="#fafafa" weight="fill" />
                                </div>
                                <p className="truncate text-sm text-white/70 flex-1">
                                    {email || "user@example.com"}
                                </p>
                            </div>

                            {/* Edit profile button */}
                            <Link
                                to="/profile/edit"
                                className="btn btn-primary btn-sm mt-4 w-full gap-2 hover:scale-[1.02] transition-transform duration-200"
                            >
                                Edit Profile
                            </Link>
                        </div>

                        {/* Sidebar menu - scrollable */}
                        <ul className="menu w-full p-3 overflow-y-auto">
                            <li>
                                <Link to="/profile">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <HashLink to="/profile#services" smooth>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path d="M20 7h-9" />
                                        <path d="M14 17H5" />
                                        <circle cx="17" cy="17" r="3" />
                                        <circle cx="7" cy="7" r="3" />
                                    </svg>
                                    Services
                                </HashLink>
                            </li>
                        </ul>
                    </div>

                    {/* Logout button - fixed at bottom */}
                    <div className="p-3 border-t border-white/10 bg-base-100/50 backdrop-blur-sm shrink-0">
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-sm w-full gap-2 text-error hover:bg-error/10 hover:text-error"
                        >
                            <SignOutIcon size={20} weight="bold" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;