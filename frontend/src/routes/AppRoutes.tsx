import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import Hero from '../Pages/Hero'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../Pages/Profile'
import EditProfile from '../Pages/EditProfile'
import ProfileLayout from '../layout/ProfileLayout,+'


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
                <Route path="edit" element={<EditProfile />} />
            </Route>
        </Routes>
    )
}