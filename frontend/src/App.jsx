import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Onboarding from "./pages/Onboarding";
import PlanBuilder from "./pages/PlanBuilder";
import Compare from "./pages/Compare";
import MyPlans from "./pages/MyPlans";
import Details from "./pages/Details";
import LoadingScreen from "./components/LoadingScreen";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import AILoading from "./pages/AILoading";
import Recommendations from "./pages/Recommendations";

function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/plan" element={<PlanBuilder />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/my-plans" element={<MyPlans />} />
          <Route path="/business/:name" element={<Details />} />
          <Route path="/chat" element={<Chat />} />
          {/* 🔥 AI FLOW */}
          <Route path="/ai-loading" element={<AILoading />} />
          <Route path="/recommendations" element={<Recommendations />} />

        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;