 import { useNavigate } from "react-router-dom";

function TopNav({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      {/* 🧠 TITLE */}
      <h1 className="text-2xl font-bold text-center">
        {title}
      </h1>

      {/* 🏠 HOME */}
      <button
        onClick={() => navigate("/home")}
        className="text-gray-400 hover:text-white transition"
      >
        🏠 Home
      </button>

    </div>
  );
}

export default TopNav;