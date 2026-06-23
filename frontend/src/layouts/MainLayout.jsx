import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
   <div className="min-h-screen text-white flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
      <Navbar />

      <div className="flex-1 p-6">
        {children}
      </div>

      <Footer />

    </div>
  );
}

export default MainLayout;