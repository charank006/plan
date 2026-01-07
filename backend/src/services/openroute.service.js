import axios from "axios";

export const getRouteDistance = async (from, to) => {
  const res = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      coordinates: [
        [from.lng, from.lat],
        [to.lng, to.lat]
      ]
    },
    {
      headers: {
        Authorization: process.env.OPENROUTE_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  const summary = res.data.features[0].properties.summary;

  return {
    distanceKm: (summary.distance / 1000).toFixed(1),
    durationMin: (summary.duration / 60).toFixed(0)
  };
};
