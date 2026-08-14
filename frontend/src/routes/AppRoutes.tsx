import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import Hero from '../Pages/Hero'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../Pages/Profile'
import EditProfile from '../Pages/EditProfile'
import ProfileLayout from '../layout/ProfileLayout'
import AdminDashboard from '../Pages/AdminDashboard'
import AdminDashboardLayout from '../layout/AdminDashboardLayout'
import ManageEngineer from '../components/ManageEngineer'
import ManageService from '../components/ManageService'
import ManageCategory from '../components/ManageCategory'
import ManageServiceRequest from '../components/ManageServiceRequest'
import Feedbacks from '../components/Feedbacks'


export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Hero />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

            </Route>

            {/* profile routes */}
            <Route path="profile" element={<ProfileLayout />}>
                <Route index element={<Profile />} />
                <Route path="edit-profile" element={<EditProfile />} />
            </Route>

            {/* admin route */}
            <Route path="admin" element={<AdminDashboardLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-engineers" element={<ManageEngineer />} />
                <Route path="manage-categories" element={<ManageCategory />} />
                <Route path="manage-services" element={<ManageService />} />
                <Route path="manage-service-requests" element={<ManageServiceRequest />} />
                <Route path="feedbacks" element={<Feedbacks />} />
            </Route>


        </Routes>
    )
}