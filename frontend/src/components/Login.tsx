
import { WrenchIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  // const { loginUser } = useAuth();

  const loginMutation = useLogin()
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
    await loginMutation.mutateAsync({ username, password });
    navigate("/profile"); 
    }
    catch (error) {
      console.error("Login failed:", error);
    }
  }


  return (
    <>
      <div className="w-full max-w-5xl min-h-100 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-white">

        {/* Left Section */}
        <div className="bg-[#093760] text-white p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
              <WrenchIcon
                size={30}
                color="#2874e3"
                weight="fill"
              />
            </div>

            <p className="text-2xl font-bold">
              ServicePro
            </p>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight">
              Smart Field Service
              <br />
              Management
            </h1>

            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Manage your service operations efficiently, dispatch engineers,
              and track field activities from one place.
            </p>

            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Instant Dispatching
              </li>

              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Real-time Tracking
              </li>

              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Equipment Maintenance
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-10 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome Back
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Login to your ServicePro account
              </p>
            </div>

            {/* username */}
            <fieldset className="mb-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your username"
              />
            </fieldset>

            {/* Password */}
            <fieldset className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your password"
              />
            </fieldset>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
            disabled={loginMutation.isPending}
              onClick={handleLogin}
              type="button"
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>

            {/* Signup */}
            <p className="text-sm text-gray-500 text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

