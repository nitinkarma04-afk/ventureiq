import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 p-5">

      <h1 className="text-xl font-bold text-white mb-10">
        Vyapar AI 🚀
      </h1>

      <ul className="space-y-4 text-gray-300">

        <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
        <li><Link to="/recommendations" className="hover:text-white">Recommendations</Link></li>
        <Link to="/saved">Saved Plans</Link>
        <li><Link to="/chat" className="hover:text-white">AI Chat</Link></li>
        <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;