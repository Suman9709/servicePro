// Sidebar.tsx
import {
    EnvelopeSimpleIcon,
    SignOutIcon,
    HouseIcon,
    UsersIcon,
    WrenchIcon,

    ClipboardTextIcon,
    UserCircleIcon,
    FolderOpenIcon,
    TicketIcon
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface SidebarProps {
    maincontent: ReactNode;
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    profileImage?: string;
    role?: string;
    onLogout?: () => void;
}

interface NavItem {
    label: string;
    path: string;
    icon: ReactNode;
    isHashLink?: boolean;
    isExternal?: boolean;
    badge?: number;
}




const Sidebar = ({
    maincontent,
    username,
    email,
    profileImage,
    first_name,
    last_name,
    role = "customer",
    onLogout
}: SidebarProps) => {
    const location = useLocation();
    const userInitial = username?.charAt(0).toUpperCase() || "U";

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            console.log("Logout clicked");
        }
    };

    // Navigation configuration
    const getNavItems = (): NavItem[] => {
        // Common items for all roles
        const commonItems: NavItem[] = [
            {
                label: "Profile",
                path: "/profile",
                icon: <UserCircleIcon size={20} weight="fill" />,
            },
        ];

        // Role-specific items
        const roleItems: Record<string, NavItem[]> = {
            admin: [
                {
                    label: "Dashboard",
                    path: "/admin/dashboard",
                    icon: <HouseIcon size={20} weight="fill" />,
                },
                {
                    label: "Engineers",
                    path: "/admin/manage-engineers",
                    icon: <UsersIcon size={20} weight="fill" />,
                    badge: 12,
                },
                {
                    label: "Categories",
                    path: "/admin/manage-categories",
                    icon: <FolderOpenIcon size={20} weight="fill" />,
                },
                {
                    label: "Services",
                    path: "/admin/manage-services",
                    icon: <WrenchIcon size={20} weight="fill" />,

                },
                {
                    label: "Service Requests",
                    path: "/admin/manage-service-requests",
                    icon: <TicketIcon size={20} weight="fill" />,

                },
                {
                    label: "Feedbacks",
                    path: "/admin/feedbacks",
                    icon: <ClipboardTextIcon size={20} weight="fill" />,
                },

            ],
            engineer: [
                {
                    label: "Dashboard",
                    path: "/engineer/dashboard",
                    icon: <HouseIcon size={20} weight="fill" />,
                },

                {
                    label: "Assigned Jobs",
                    path: "/engineer/manage-service",
                    icon: <TicketIcon size={20} weight="fill" />,
                },

            ],
            customer: [
                {
                    label: "Dashboard",
                    path: "/profile/all-request",
                    icon: <WrenchIcon size={20} weight="fill" />,
                },

                {
                    label: "My Bookings",
                    path: "/profile/book-service",
                    icon: <TicketIcon size={20} weight="fill" />,
                },


            ],
        };

        return [...commonItems, ...(roleItems[role] || roleItems.customer)];
    };

    const navItems = getNavItems();

    // Check if a path is active
    const isActive = (path: string) => {
        if (path.includes('#')) {
            return location.pathname === path.split('#')[0];
        }
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Render navigation link
    const renderNavLink = (item: NavItem) => {
        const active = isActive(item.path);
        const baseClasses = `flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${active
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`;

        const content = (
            <>
                <div className="flex items-center gap-3">
                    <span className={active ? 'text-primary' : 'text-gray-500'}>
                        {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                </div>

            </>
        );

        if (item.isHashLink) {
            return (
                <HashLink to={item.path} smooth className={baseClasses}>
                    {content}
                </HashLink>
            );
        }

        return (
            <Link to={item.path} className={baseClasses}>
                {content}
            </Link>
        );
    };

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex min-h-screen flex-col">
                <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-sm border-b border-gray-100">
                    <div className="flex h-full items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">ServicePro</span>
                            <span className="badge badge-primary badge-sm capitalize">{role}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <label
                                htmlFor="my-drawer-4"
                                className="btn btn-square text-2xl btn-ghost lg:hidden text-black font-bold"
                            >
                                ☰
                            </label>

                            <div className="avatar">
                                <div className="w-10 rounded-full border-2 border-primary/30">
                                    {profileImage ? (
                                        <img src={profileImage} alt={username || "User"} />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary/70 font-bold text-white">
                                            {userInitial}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-x-auto pt-16 lg:ml-64">
                    <div className="min-h-screen bg-gray-50">
                        {maincontent}
                    </div>
                </main>
            </div>

            <div className="drawer-side scrollbar-none">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />

                <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg flex flex-col overflow-hidden scrollbar-none border-r border-gray-100">
                    <div className="flex-1 overflow-y-auto p-4 cscrollbar-none">
                        {/* User Profile Card */}
                        <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-4 mb-6 border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-white">
                                        {profileImage ? (
                                            <img src={profileImage} alt={username || "User"} className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary/70 font-bold text-white text-lg">
                                                {userInitial}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h1 className="text-sm font-bold text-gray-900 truncate">
                                        {first_name} {last_name}
                                    </h1>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-primary">@</span>
                                        <span className="text-xs text-gray-500 truncate">
                                            {username || "User"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-3 before:bg-gray-200 after:bg-gray-200"></div>

                            <div className="flex items-center gap-2 px-1">
                                <EnvelopeSimpleIcon size={14} className="text-gray-400" weight="fill" />
                                <span className="text-xs text-gray-600 truncate flex-1">
                                    {email || "user@example.com"}
                                </span>
                            </div>

                            <Link
                                to="/profile/edit-profile"
                                className="btn btn-primary btn-xs mt-3 w-full gap-1 hover:scale-[1.02] transition-transform"
                            >
                                Edit Profile
                            </Link>
                        </div>

                        {/* Navigation Menu */}
                        <div className="space-y-1">

                            {navItems.map((item, index) => (
                                <div key={index}>
                                    {renderNavLink(item)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="p-3 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-sm w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <SignOutIcon size={18} weight="bold" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;