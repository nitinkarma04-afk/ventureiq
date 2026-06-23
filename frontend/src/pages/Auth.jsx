import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === form.email && u.password === form.password
    );

    if (!user) {
      alert("Invalid credentials ❌");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 AUTO REDIRECT
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      navigate("/chat");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="bg-white/5 p-8 rounded-xl w-[350px]">

          <h2 className="text-xl mb-6 text-center">
            Login 🚀
          </h2>

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 mb-4 bg-gray-800 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 mb-4 bg-gray-800 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 py-3 rounded"
          >
            Login
          </button>

        </div>
      </div>
    </>
  );
}

export default Auth;