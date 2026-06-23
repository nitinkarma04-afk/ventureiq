import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
function Dashboard() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!location || !budget) {
      alert("Please fill all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 SMART LOGIN CHECK
    if (!user) {
      alert("Login to continue 🚀");
      navigate("/login");
      return;
    }

    navigate("/recommendations", {
      state: { location, budget },
    });
  };

  return (
    <MainLayout>
       <TopNav title="Dashboard 🚀" />

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl max-w-xl mx-auto shadow-lg">

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white outline-none"
        />

        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Get Recommendations
        </button>

      </div>
    </MainLayout>
  );
}

export default Dashboard;