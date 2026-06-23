import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { BUSINESS_DATA } from "../data/businessData";

function Compare() {
  const location = useLocation();

  // 🔥 Get selected business from Detail page
  const selected = location.state?.selected;

  const list = Object.keys(BUSINESS_DATA);

  // 🔥 AUTO SELECT (IMPORTANT FIX)
  const [first, setFirst] = useState(
    selected && list.includes(selected) ? selected : list[0]
  );

  const [second, setSecond] = useState(
    selected && selected !== list[1] ? list[1] : list[0]
  );

  // 🔥 CARD COMPONENT
  const Card = ({ title }) => {
    const data = BUSINESS_DATA[title];

    if (!data) {
      return (
        <div className="bg-red-500 p-4 rounded">
          Data not found ❌
        </div>
      );
    }

    return (
      <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:shadow-xl transition">

        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <p>💰 Investment: {data.investment}</p>
        <p className="text-green-400">📈 Profit: {data.profit}</p>
        <p>⚠️ Risk: {data.risk}</p>
        <p>🔥 Demand: {data.demand}</p>

        <div className="mt-4 space-y-1">
          <p>Ease: {data.ease}/10</p>
          <p>Profit Score: {data.profitScore}/10</p>
        </div>

      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0f172a] text-white p-6 md:p-10">

        {/* 🔥 TITLE */}
        <h1 className="text-3xl md:text-4xl text-center mb-10 font-bold">
          Compare Business Ideas ⚖️
        </h1>

        {/* 🔥 SELECTORS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">

          <select
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="bg-gray-800 p-3 rounded-lg outline-none"
          >
            {list.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            className="bg-gray-800 p-3 rounded-lg outline-none"
          >
            {list.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

        </div>

        {/* 🔥 COMPARE GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          <Card title={first} />
          <Card title={second} />

        </div>

      </div>
    </>
  );
}

export default Compare;