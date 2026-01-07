import {
  calculateDistanceKm,
  calculateDailyBudget,
  estimateTravelCost,
  getSeasonFromDate
} from "../rules/index.js"; 

export const generatePlan = async (req, res) => {
  try {
    console.log("🔥 ENTERED generatePlan controller");
    console.log("BODY:", req.body);

    const { startDate, budget, days, people } = req.body;

    if (!startDate || !budget || !days || !people) {
      console.log("❌ Missing fields in request body");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const season = getSeasonFromDate(startDate);
    const dailyBudget = calculateDailyBudget(budget, days, people);
    const travel = estimateTravelCost(650);

    console.log("✅ Computed values:", { season, dailyBudget, travel });

    return res.json({
  travelOptions: {
    "CityA → CityB": [
      { id: "train", mode: "Train", price: 1200, duration: "6h" },
      { id: "bus", mode: "Bus", price: 800, duration: "8h" }
    ]
  },
  itinerary: [
    {
      day: 1,
      date: startDate,
      location: "CityB",
      isTravel: true,
      travelDetails: {
        from: "CityA",
        to: "CityB",
        mode: "Train"
      },
      activities: [
        { time: "08:00", activity: "Depart from CityA" },
        { time: "14:00", activity: "Arrive at CityB" }
      ]
    }
  ],
  meta: {
    season,
    dailyBudget,
    travelCost: travel
  }
});


  } catch (error) {
    console.error("❌ ERROR in generatePlan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};