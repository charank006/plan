import axios from "axios";

export const getNearbyPlaces = async (lat, lon, query = "tourist attraction") => {
  const res = await axios.get(
    "https://api.foursquare.com/v3/places/search",
    {
      headers: {
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
      params: {
        ll: `${lat},${lon}`,
        query,
        limit: 5,
      },
    }
  );

  return res.data.results.map(place => ({
    name: place.name,
    category: place.categories[0]?.name,
    address: place.location.formatted_address,
  }));
};
