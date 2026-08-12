import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"
// import { useAuth } from "../context/AuthContext";
import { useLogout, useProfile } from "../hooks/useAuth";


const ProfileLayout = () => {
    const { data: user } = useProfile()
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            console.log("Logout Successful");

        }
        catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <>
            <Sidebar
                first_name={user?.first_name}
                last_name={user?.last_name}
                username={user?.username}
                email={user?.email}
                maincontent={<Outlet />}
                onLogout={handleLogout}
            />
        </>
    )

}
export default ProfileLayout