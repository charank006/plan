import { getCitiesByCountry } from "../services/geodb.service.js";
import { getWeatherByCoords } from "../services/weather.service.js";
import { getSeasonFromDate } from "../services/season.service.js";

export const getRecommendedPlaces = async (req, res) => {
  const { startDate } = req.body;
  const season = getSeasonFromDate(startDate);

  const cities = await getCitiesByCountry("IN");

  const results = [];

  for (const city of cities) {
    if (!city.latitude || !city.longitude) continue;

    const weather = await getWeatherByCoords(
      city.latitude,
      city.longitude
    );

    const temp = weather.main.temp;

    // Simple season logic
    if (
      (season === "Winter" && temp > 20) ||
      (season === "Summer" && temp < 25)
    ) {
      results.push({
        name: city.city,
        temperature: temp,
        season,
      });
    }
  }

  res.json({
    season,
    places: results,
  });
};
