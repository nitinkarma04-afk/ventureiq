const express = require("express");
const router = express.Router();
const axios = require("axios");

// 🔥 AI + FALLBACK
router.post("/get", async (req, res) => {
  const { location, budget, interest } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Suggest 5 business ideas for:
Budget: ${budget}
Interest: ${interest}
City: ${location}`,
              },
            ],
          },
        ],
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const ideas = text
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i);

    res.json({
      source: "AI",
      ideas,
    });

  } catch (err) {
    console.log("AI failed");

    // fallback
    let ideas = [];

    if (budget === "<50k") {
      ideas = ["Tea Stall", "Street Food"];
    } else if (budget === "50k–2L") {
      ideas = ["Cafe", "Shop"];
    } else {
      ideas = ["Restaurant", "Gym"];
    }

    res.json({
      source: "fallback",
      ideas,
    });
  }
});

module.exports = router;