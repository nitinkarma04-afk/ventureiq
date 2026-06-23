import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import TopNav from "../components/TopNav";

function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH SAVED PLANS
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/plan");
        setPlans(res.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchPlans();
  }, []);

  // 🔥 DELETE PLAN
  const deletePlan = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/plan/${id}`);

      alert("Deleted successfully ❌");

      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
       <TopNav title="Saved Plans 💼" />
      {/* 🔥 MAIN FIX HERE */}
      {loading ? (
        // 👉 ONLY loader dikhega
        <p className="text-center text-gray-400 mt-10">
          Loading... ⏳
        </p>
      ) : (
        // 👉 Jab loading khatam tab ye chalega
        <div className="grid grid-cols-3 gap-6">

          {/* EMPTY STATE */}
          {plans.length === 0 && (
            <p className="text-gray-400 text-center mt-10 col-span-3">
              No saved plans yet 🚀
            </p>
          )}

          {/* DATA */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition duration-300"
            >
              <h2 className="text-xl font-bold">{plan.idea}</h2>

              <p className="text-gray-400 mt-2">
                📍 {plan.location}
              </p>

              <p className="text-green-400 mt-2">
                💰 Budget: ₹{plan.budget}
              </p>

              <button
                onClick={() => deletePlan(plan._id)}
                className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      )}
    </MainLayout>
  );
}

export default SavedPlans;