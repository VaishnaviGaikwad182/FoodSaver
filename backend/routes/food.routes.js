const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const auth = require("../middleware/auth.middleware");

// Add food (provider only)
router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Only providers allowed" });
    }

    const food = new Food({
      ...req.body,
      providerId: req.user.id
    });

    await food.save();
    res.status(201).json({ message: "Food posted successfully", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get provider's own food (provider only)
router.get("/mine", auth, async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Only providers allowed" });
    }

    const foods = await Food.find({ providerId: req.user.id });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get available food for collectors (collector only)
router.get("/available", auth, async (req, res) => {
  try {
    if (req.user.role !== "collector") {
      return res.status(403).json({ message: "Only collectors allowed" });
    }

    const foods = await Food.find({ status: "Pending" }).populate("providerId", "name email");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/accept", auth, async (req, res) => {
  try {
    if (req.user.role !== "collector") {
      return res.status(403).json({ message: "Only collectors allowed" });
    }

    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.status !== "Pending") {
      return res.status(400).json({ message: "Food already accepted or collected" });
    }

    food.status = "Accepted";
    food.taken = true; 
    food.collectorId = req.user.id; 
    await food.save();

    res.json({ message: "Food accepted successfully", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
