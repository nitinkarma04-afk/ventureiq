import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  // 🔥 LOAD DATA
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("plans")) || [];
    setPlans(stored);
  }, []);

  // 🔥 DELETE PLAN
  const deletePlan = (id) => {
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    localStorage.setItem("plans", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] text-white p-6 md:p-10">

        <h1 className="text-3xl font-bold mb-8">
          My Saved Plans 💾
        </h1>

        {plans.length === 0 ? (
          <p className="text-gray-400">No plans saved yet 😢</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {plans.map((plan, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold">{plan.id}</h2>

                <p className="text-gray-400 text-sm mt-2">
                  Saved on: {new Date(plan.savedAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">

                  {/* 🔥 OPEN */}
                  <button
                    onClick={() =>
                      navigate("/plan", {
                        state: { business: plan.id },
                      })
                    }
                    className="text-blue-400 hover:underline"
                  >
                    Open →
                  </button>

                  {/* 🔥 DELETE */}
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default MyPlans;