 import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email) {
      alert("Fill all fields");
      return;
    }

    const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
      name,
      email,
    });

    // 🔥 Save user locally
    localStorage.setItem("user", JSON.stringify(res.data));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">

      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg w-80">

        <h2 className="text-2xl mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;