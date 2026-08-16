import { Outlet, useNavigate } from "react-router-dom";
import { useLogout, useProfile } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";


const EngineerDashboardLayout = () => {

    const navigate = useNavigate();
    const { data: user } = useProfile()
    const logoutMutation = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            navigate("/login");
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
                role ={user?.role}
                maincontent={<Outlet />}
                onLogout={handleLogout}
            />
        </>
    )

}
  
export default EngineerDashboardLayout