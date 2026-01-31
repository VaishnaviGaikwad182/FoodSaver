const Food = require("../models/Food");

// Fetch available food
exports.getAvailableFood = async (req, res) => {
  try {
    if (req.user.role !== "collector") {
      return res.status(403).json({ message: "Only collectors allowed" });
    }

    const foods = await Food.find({ taken: false });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
