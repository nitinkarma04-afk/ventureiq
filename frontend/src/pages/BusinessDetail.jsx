import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BusinessDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white p-10">

        <button onClick={() => navigate(-1)}>← Back</button>

        <h1 className="text-3xl mt-4 mb-6">{name}</h1>

        <div className="bg-white/5 p-6 rounded-xl">
          <p>💰 Investment: ₹50k–₹2L</p>
          <p>📈 Profit: High</p>
          <p>⚠️ Risk: Medium</p>
        </div>

        <div className="flex gap-4 mt-6">

          {/* PLAN */}
          <button
            onClick={() =>
              navigate("/plan", { state: { business: name } })
            }
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Create Plan 🚀
          </button>

          {/* COMPARE */}
          <button
            onClick={() =>
              navigate("/compare", { state: { selected: name } })
            }
            className="bg-yellow-500 px-4 py-2 rounded"
          >
            Compare ⚖️
          </button>

        </div>

      </div>
    </>
  );
}

export default BusinessDetail;