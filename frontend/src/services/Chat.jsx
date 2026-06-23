import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input }
      );

      const aiMsg = {
        sender: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "AI error ❌" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6">

        {/* CHAT AREA */}
        <div className="flex-1 max-w-2xl mx-auto w-full space-y-4">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 ml-auto"
                  : "bg-white/10"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-white/10 p-3 rounded-xl">
              🤖 Thinking...
            </div>
          )}

        </div>

        {/* INPUT */}
        <div className="flex gap-2 mt-4 max-w-2xl mx-auto w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask business idea..."
            className="flex-1 p-3 rounded bg-gray-800"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 px-6 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </>
  );
}

export default Chat;