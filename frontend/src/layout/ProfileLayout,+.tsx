import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext";


const ProfileLayout = () => {
    const { user } = useAuth();
    const {logoutUser} = useAuth();

    const handleLogout =  async() => {
       await logoutUser();
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