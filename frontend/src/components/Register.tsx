
import { WrenchIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      username,
      email,
      phoneNumber,
      password,
    });
  };


return (
  <>
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl bg-white">

      {/* ================= LEFT SECTION ================= */}
      <div className="bg-[#093760] text-white p-8 md:p-10 flex flex-col justify-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
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
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Smart Field Service
            <br />
            Management
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
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

      {/* ================= RIGHT SECTION ================= */}
      <div className="bg-white p-6 md:p-8 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Create your ServicePro customer account
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <fieldset className="mb-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your username"
                required
              />
            </fieldset>

            {/* Email */}
            <fieldset className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your email"
                required
              />
            </fieldset>

            {/* Phone */}
            <fieldset className="mb-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>

              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-10 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your phone number"
                required
              />
            </fieldset>

            {/* Password */}
            <fieldset className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Create a password"
                required
                minLength={8}
              />
            </fieldset>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  </>
);


};

export default Register;

