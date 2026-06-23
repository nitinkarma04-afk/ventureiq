import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Explore() {
  const navigate = useNavigate();
  const preferences = JSON.parse(localStorage.getItem("userPreferences"));

  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setSaved(data);
  }, []);

  const toggleSave = (item) => {
    let updated;

    if (saved.includes(item.name)) {
      updated = saved.filter((i) => i !== item.name);
    } else {
      updated = [item.name, ...saved];
    }

    setSaved(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const ideas = [
    {
      name: "Tea Stall ☕",
      category: "Low Budget",
      investment: 50000,
      profitScore: 8,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200",
    },
    {
      name: "Cafe 🍔",
      category: "High Investment",
      investment: 500000,
      profitScore: 10,
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200",
    },
    {
      name: "Grocery Store 🛒",
      category: "Stable",
      investment: 300000,
      profitScore: 6,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200",
    },
    {
      name: "Salon 💇",
      category: "Service",
      investment: 200000,
      profitScore: 8,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    },
    {
      name: "Tiffin Service 🍱",
      category: "Low Budget",
      investment: 40000,
      profitScore: 9,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
    },
    {
      name: "Coaching Center 📚",
      category: "Service",
      investment: 150000,
      profitScore: 9,
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200",
    },
  ];

  // FILTER + SEARCH
  let filteredIdeas = ideas.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;

    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // SORT
  if (sort === "low-investment") {
    filteredIdeas.sort((a, b) => a.investment - b.investment);
  } else if (sort === "high-profit") {
    filteredIdeas.sort((a, b) => b.profitScore - a.profitScore);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white px-6 md:px-10 py-10">
        {/* SEARCH + SORT */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 bg-white/10 rounded w-full"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 bg-white/10 rounded"
          >
            <option value="default">Sort</option>
            <option value="low-investment">Low Investment</option>
            <option value="high-profit">High Profit</option>
          </select>
        </div>

        {/* FILTER */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {["All", "Low Budget", "High Investment", "Service", "Stable"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded ${
                  activeCategory === cat ? "bg-blue-500" : "bg-white/10"
                }`}
              >
                {cat}
              </button>
            ),
          )}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredIdeas.map((item, i) => {
            const isSaved = saved.includes(item.name);

            return (
              <div key={i} className="bg-white/5 p-4 rounded-xl">
                {/* ❤️ SAVE */}
                <button
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user"));

                    if (!user) {
                      navigate("/login", { state: { from: "save" } });
                      return;
                    }

                    toggleSave(item);
                  }}
                >
                  ❤️
                </button>

                <img src={item.image} className="h-40 w-full object-cover" />

                <h2 className="mt-3">{item.name}</h2>

                {/* DETAILS */}
                <button onClick={() => navigate(`/business/${item.name}`)}>
                  Details →
                </button>

                {/* 🔥 PLAN BUTTON */}
                <button
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem("user"));

                    if (!user) {
                      navigate("/login", {
                        state: { from: "/plan", business: item.name },
                      });
                    } else {
                      navigate("/plan", {
                        state: { business: item.name },
                      });
                    }
                  }}
                >
                  Plan ⚡
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Explore;
