import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Recommendations() {
  const navigate = useNavigate();
  const location = useLocation();

  const preferences =
    location.state ||
    JSON.parse(localStorage.getItem("userPreferences")) || {
      budget: "<50k",
      interest: "🍔 Food & Cafe",
      city: "Lucknow",
    };

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("AI");
  const [error, setError] = useState("");

  // 🔧 helper: clean bullets/numbering from AI text
  const cleanIdeas = (arr) =>
    arr
      .map((i) => i.replace(/^\s*\d+[\).\s-]*/, "").trim())
      .filter(Boolean);

  const fetchAI = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/recommendation/get",
        {
          location: preferences.city,
          budget: preferences.budget,
          interest: preferences.interest,
        }
      );

      const cleaned = cleanIdeas(res.data.ideas || []);
      setIdeas(cleaned);
      setSource(res.data.source || "AI");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch AI results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAI();
    // eslint-disable-next-line
  }, []);

  // 🔥 LOADING (skeleton)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white p-10">
        <Navbar />
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="h-10 w-72 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="h-40 bg-white/10 rounded-2xl animate-pulse mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-white/10 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🔥 ERROR
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center">
          <p className="mb-4 text-red-400">{error}</p>
          <button
            onClick={fetchAI}
            className="bg-blue-500 px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  // 🔥 EMPTY
  if (!ideas.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">No ideas found 😢</h2>
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-blue-500 px-6 py-3 rounded-xl"
          >
            Try Again 🔄
          </button>
        </div>
      </>
    );
  }

  const main = ideas[0];
  const others = ideas.slice(1);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] text-white px-6 md:px-10 py-10">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            🔥 Best Business For You
          </h1>
          <p className="text-gray-400">
            {source === "AI" ? "Powered by AI 🤖" : "Smart suggestions"}
          </p>
        </div>

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-10 rounded-3xl border border-white/10 text-center mb-14 shadow-xl"
        >
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              source === "AI" ? "bg-blue-500" : "bg-yellow-500 text-black"
            }`}
          >
            {source === "AI" ? "AI Suggested 🔥" : "Fallback"}
          </span>

          <h2 className="text-4xl font-bold mt-4">{main}</h2>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() =>
                navigate("/plan", { state: { business: main } })
              }
              className="bg-green-500 px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Start Plan 🚀
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20 transition"
            >
              Explore →
            </button>
          </div>
        </motion.div>

        {/* OTHER IDEAS */}
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <h4 className="font-bold text-lg">{idea}</h4>

              <button
                onClick={() =>
                  navigate("/plan", { state: { business: idea } })
                }
                className="mt-4 text-blue-400 text-sm hover:underline"
              >
                View Plan →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommendations;