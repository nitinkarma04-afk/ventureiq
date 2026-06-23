const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a startup advisor. Help user in simple words.\nUser: ${message}`,
              },
            ],
          },
        ],
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply: "AI failed ❌",
    });
  }
});

module.exports = router;