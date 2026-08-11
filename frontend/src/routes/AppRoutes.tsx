import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import Hero from '../Pages/Hero'
import Login from '../components/Login'
import Register from '../components/Register'
import Profile from '../Pages/Profile'


export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Hero />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}