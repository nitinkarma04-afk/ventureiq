import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    budget: "",
    interest: "",
    city: "",
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  // 🔥 FINAL SUBMIT (AI FLOW START)
  const handleFinish = () => {
    localStorage.setItem("userPreferences", JSON.stringify(form));

    navigate("/ai-loading", {
      state: form, // 🔥 important
    });
  };

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6"
      >
        <div className="w-full max-w-3xl">

          <p className="text-center mb-6 text-gray-400">
            Step {step} of 3
          </p>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold text-center mb-6">
                Select Budget 💰
              </h1>

              <div className="flex gap-4 justify-center">
                {["<50k", "50k–2L", "2L–10L"].map((b) => (
                  <button
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    className={`p-4 rounded-xl ${
                      form.budget === b
                        ? "bg-blue-500"
                        : "bg-white/10"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="mt-6 w-full bg-blue-500 py-2 rounded"
              >
                Continue →
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h1 className="text-3xl font-bold text-center mb-6">
                Interest 🎯
              </h1>

              <div className="flex gap-4 justify-center">
                {["🍔 Food & Cafe", "🛍️ Retail & Shop", "💼 Services"].map((i) => (
                  <button
                    key={i}
                    onClick={() => setForm({ ...form, interest: i })}
                    className={`p-4 rounded-xl ${
                      form.interest === i
                        ? "bg-purple-500"
                        : "bg-white/10"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={back} className="w-full bg-gray-600 py-2 rounded">
                  Back
                </button>
                <button onClick={next} className="w-full bg-purple-500 py-2 rounded">
                  Continue
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h1 className="text-3xl font-bold text-center mb-6">
                Your City 📍
              </h1>

              <input
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                placeholder="Enter city"
                className="w-full p-3 bg-gray-800 rounded"
              />

              <div className="flex gap-4 mt-6">
                <button onClick={back} className="w-full bg-gray-600 py-2 rounded">
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="w-full bg-green-500 py-2 rounded"
                >
                  Generate 🚀
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Onboarding;