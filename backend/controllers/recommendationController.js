const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔥 CONNECT DATABASE
connectDB();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 ROUTES
app.use("/api/recommendation", require("./routes/recommendationRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/plan", require("./routes/planRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully");
});

// 🔥 SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});