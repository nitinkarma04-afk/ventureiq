import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BUSINESS_DATA } from "../data/businessData";

function PlanBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 LOGIN PROTECTION
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const business = location.state?.business || "Tea Stall ☕";
  const data = BUSINESS_DATA[business];

  const savePlan = () => {
    const existing = JSON.parse(localStorage.getItem("plans")) || [];

    const alreadySaved = existing.find((p) => p.id === business);

    if (alreadySaved) {
      alert("Already saved ⚠️");
      return;
    }

    const newPlan = {
      id: business,
      savedAt: Date.now(),
    };

    localStorage.setItem("plans", JSON.stringify([newPlan, ...existing]));
    alert("Plan saved ✅");
  };

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-white">
          No Plan Found ❌
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white p-10">

        <button onClick={() => navigate(-1)}>← Back</button>

        <h1 className="text-3xl font-bold mb-6">
          {business} Startup Plan 🚀
        </h1>

        <p>💰 {data.investment}</p>
        <p>📈 {data.profit}</p>

        <button onClick={savePlan} className="mt-5 bg-blue-500 px-4 py-2 rounded">
          Save Plan 💾
        </button>

      </div>
    </>
  );
}

export default PlanBuilder;