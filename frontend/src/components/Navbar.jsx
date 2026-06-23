 import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiBarChart2,
  FiLogIn,
  FiLogOut,
  FiUser,
  FiLayers,
} from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔥 LINK STYLE (active + hover + underline animation)
  const linkStyle = ({ isActive }) =>
    `relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
    after:absolute after:left-2 after:-bottom-1 after:h-[2px] after:w-0
    after:bg-gradient-to-r after:from-blue-400 after:to-purple-500
    after:transition-all after:duration-300
    ${isActive ? "after:w-[60%]" : "hover:after:w-[60%]"}`;

  return (
    <div
      className="flex justify-between items-center px-8 py-4 
      sticky top-0 z-50 backdrop-blur-xl
      bg-gradient-to-r from-[#020617]/80 via-[#0f172a]/80 to-[#020617]/80
      border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
    >
      {/* 🔥 LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer 
        bg-gradient-to-r from-blue-400 to-purple-500 
        text-transparent bg-clip-text hover:scale-105 transition"
      >
        VyparAI 🚀
      </h1>

      {/* 🔥 CENTER LINKS */}
      <div className="flex gap-6 text-sm md:text-base">

        <NavLink to="/" className={linkStyle}>
          <FiHome /> Home
        </NavLink>

        <NavLink to="/explore" className={linkStyle}>
          <FiCompass /> Explore
        </NavLink>

        {user && (
          <>
            <NavLink to="/my-plans" className={linkStyle}>
              <FiLayers /> Plans
            </NavLink>

            <NavLink to="/compare" className={linkStyle}>
              <FiBarChart2 /> Compare
            </NavLink>
          </>
        )}
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 
            bg-gradient-to-r from-blue-500 to-purple-600 
            px-5 py-2 rounded-lg text-white 
            hover:scale-105 active:scale-95 transition shadow-lg"
          >
            <FiLogIn /> Login
          </button>
        ) : (
          <>
            {/* USER */}
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <FiUser /> {user.name}
            </div>

            {/* DASHBOARD */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white/10 px-4 py-2 rounded-lg 
              hover:bg-white/20 transition"
            >
              Dashboard
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 
              bg-red-500/90 px-4 py-2 rounded-lg 
              hover:bg-red-600 transition"
            >
              <FiLogOut /> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;