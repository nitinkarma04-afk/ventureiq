import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Details() {
  const { name } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(name);

  // 🔥 FULL DATA (ALL ITEMS FIXED)
  const data = {
    "Tea Stall ☕": {
      investment: "₹30k–₹80k",
      profit: "₹1000–2000/day",
      risk: "Low",
      location: "Near colleges / offices",
      score: 8.5,
      ai: "Best low investment business with fast cash flow.",
      tips: ["Evening peak time", "Good taste", "Add snacks"],
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200",
    },
    "Cafe 🍔": {
      investment: "₹3L–₹10L",
      profit: "₹5k–15k/day",
      risk: "Medium",
      location: "Urban / youth area",
      score: 9.2,
      ai: "High profit but needs branding & investment.",
      tips: ["Interior matters", "Instagram marketing", "Unique menu"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200",
    },
    "Grocery Store 🛒": {
      investment: "₹2L–₹5L",
      profit: "₹2k–5k/day",
      risk: "Low",
      location: "Residential area",
      score: 7.8,
      ai: "Stable income but low margin business.",
      tips: ["Daily items", "Fast service", "Delivery option"],
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200",
    },
    "Salon 💇": {
      investment: "₹1L–₹4L",
      profit: "₹2k–6k/day",
      risk: "Medium",
      location: "Market / city",
      score: 8.7,
      ai: "Skill-based high return business.",
      tips: ["Good staff", "Clean environment", "Offer packages"],
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    },
    "Tiffin Service 🍱": {
      investment: "₹20k–₹70k",
      profit: "₹1k–3k/day",
      risk: "Low",
      location: "Hostel / PG",
      score: 8.9,
      ai: "High demand in urban areas, scalable model.",
      tips: ["Healthy food", "Subscription model", "On-time delivery"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
    },
    "Coaching Center 📚": {
      investment: "₹1L–₹3L",
      profit: "₹5k–20k/month",
      risk: "Medium",
      location: "Near schools",
      score: 9.0,
      ai: "High earning potential with strong teaching.",
      tips: ["Experienced teachers", "Results focus", "Marketing"],
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200",
    },
  };

  const item = data[decodedName];

  if (!item) {
    return <div className="text-white p-10">❌ No data found</div>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 md:px-12 py-10">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        {/* 🔥 TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src={item.image}
              className="w-full h-[280px] object-cover hover:scale-105 transition"
            />
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold mb-4">{decodedName}</h1>

            <p className="text-gray-400 mb-5">
              Smart business insights & planning analysis
            </p>

            <div className="space-y-2">
              <p>💰 Investment: {item.investment}</p>
              <p className="text-green-400">📈 Profit: {item.profit}</p>
              <p>⚠️ Risk: {item.risk}</p>
              <p>📍 Location: {item.location}</p>
            </div>

            {/* 🔥 SCORE */}
            <div className="mt-5">
              <p className="text-sm text-gray-400">AI Score</p>
              <div className="w-full bg-white/10 h-2 rounded-full mt-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${item.score * 10}%` }}
                />
              </div>
              <p className="text-sm mt-1">{item.score}/10</p>
            </div>
          </motion.div>
        </div>

        {/* 🔥 AI ANALYSIS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-white/10 mb-10"
        >
          <h2 className="text-xl font-bold mb-2">🤖 AI Insight</h2>
          <p className="text-gray-300">{item.ai}</p>
        </motion.div>

        {/* 🔥 TIPS */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-10">
          <h2 className="text-xl font-bold mb-4">📌 Growth Tips</h2>

          <ul className="space-y-2 text-gray-300">
            {item.tips.map((tip, i) => (
              <li key={i}>✔ {tip}</li>
            ))}
          </ul>
        </div>

        {/* 🔥 CTA */}
        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() =>
              navigate("/plan", { state: { business: decodedName } })
            }
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl hover:scale-105 transition shadow-lg"
          >
            Create Plan 🚀
          </button>

          <button
            onClick={() => navigate("/compare")}
            className="bg-white/10 px-6 py-3 rounded-xl hover:bg-white/20 transition"
          >
            Compare ⚖️
          </button>

        </div>

      </div>
    </>
  );
}

export default Details;