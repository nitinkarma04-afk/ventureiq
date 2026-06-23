import { motion } from "framer-motion";
 

function LoadingScreen() {
  return (
    
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[999] bg-[#020617] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">

        {/* 🔥 LOGO / TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          VyparAI 🚀
        </motion.h1>

        {/* 🔥 LOADER */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.1,
              }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
          ))}
        </div>

        <p className="text-gray-400 text-sm">
          Loading experience...
        </p>

      </div>
    </motion.div>
  );
}

export default LoadingScreen;