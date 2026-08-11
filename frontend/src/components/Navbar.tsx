import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { logoutUser, user } = useAuth();

    const handleLogout =  async() => {
       await logoutUser();
    }
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">ServicePro</a>
                </div>
                <div className="flex-none "  >
                    <ul className="menu menu-horizontal px-5">
                        <li >Home</li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full flex items-center justify-center border text-white font-bold">
                                {user?.username?.at(0)?.toUpperCase() || "U"}
                            </div>
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile

                                </Link>
                            </li>
                            <li><button type="button" onClick={handleLogout}>
                                Logout
                            </button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
