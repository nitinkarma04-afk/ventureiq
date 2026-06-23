const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

console.log("Plan route file loaded ✅");

 
 
// 🔥 SAVE PLAN
router.post("/save", async (req, res) => {
  console.log("🔥 PLAN SAVE HIT", req.body);
  try {
    const { idea, location, budget } = req.body;

    const newPlan = await Plan.create({
      idea,
      location,
      budget,
    });
    res.json(newPlan);
  } catch (error) {
    res.status(500).json({ error: "Error saving plan" });
  }
});

// 🔥 GET ALL PLANS
router.get("/", async (req, res) => {
  const plans = await Plan.find().sort({ createdAt: -1 });
  res.json(plans);
});

// ❌ DELETE PLAN
router.delete("/:id", async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting plan" });
  }
});
module.exports = router;