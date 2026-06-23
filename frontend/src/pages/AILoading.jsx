import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AILoading() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/recommendations", {
        state: location.state, // 🔥 pass data
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">

      <h1 className="text-3xl font-bold mb-4 animate-pulse">
        🤖 AI is analyzing...
      </h1>

      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-6 text-gray-400">
        Finding best business ideas 🚀
      </p>

    </div>
  );
}

export default AILoading;