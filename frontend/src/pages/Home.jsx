import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const handleStart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login", {
        state: { redirectTo: "/chat" },
      });
    } else {
      navigate("/chat");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[250px] rounded-full top-[-200px] left-[5%]" />
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[250px] rounded-full bottom-[-200px] right-[5%]" />

        {/* 🔥 HERO */}
        <section className="text-center pt-36 pb-24 px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 px-4 py-1 rounded-full text-sm border border-white/10 backdrop-blur"
          >
            🚀 Next Gen Startup Builder
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mt-6 mb-6 leading-tight"
          >
            Build Your Business <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
              Like a Pro
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto mb-10 text-lg"
          >
            Stop guessing. Start building with insights, planning tools, and
            real-world data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("user"));

                if (!user) {
                  navigate("/login", {
                    state: { redirectTo: "/chat" }, // 🔥 FIX
                  });
                } else {
                  navigate("/chat"); // 🔥 DIRECT CHAT
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-xl shadow-lg"
            >
              Start Planning 🚀
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/explore")}
              className="bg-white/10 px-8 py-3 rounded-xl backdrop-blur"
            >
              Explore Ideas ⚡
            </motion.button>
          </motion.div>
        </section>

        {/* 🔥 FEATURE CARDS */}
        <section className="grid md:grid-cols-3 gap-8 px-6 md:px-16 mb-24">
          {[
            { title: "Smart Ideas", icon: "💡", desc: "AI-based suggestions" },
            {
              title: "Location Analysis",
              icon: "📍",
              desc: "Find best location",
            },
            { title: "Profit Engine", icon: "📈", desc: "Track growth & ROI" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/40 to-purple-500/40"
            >
              <div className="bg-[#020617] p-6 rounded-2xl backdrop-blur-xl border border-white/10">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 🔥 TRENDING */}
        <section className="px-6 md:px-16 mb-28">
          <h2 className="text-3xl text-center mb-12 font-semibold">
            🔥 Trending Opportunities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Tea Stall ☕",
              "Cafe 🍔",
              "Salon 💇",
              "Gym 💪",
              "Grocery 🛒",
              "Coaching 📚",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/explore")}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 cursor-pointer"
              >
                <h3 className="text-xl font-bold">{item}</h3>
                <p className="text-gray-400 mt-2">High demand opportunity</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🔥 FINAL CTA */}
        <section className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl mb-6 font-semibold"
          >
            Start Building Today 🚀
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/onboarding")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-xl shadow-lg"
          >
            Get Started
          </motion.button>
        </section>

        {/* FOOTER */}
        <div className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
          © 2026 VyparAI • Premium Experience 🚀
        </div>
      </div>
    </>
  );
}

export default Home;
