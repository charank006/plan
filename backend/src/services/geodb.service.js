import axios from "axios";

export const getCitiesByCountry = async (countryCode = "IN") => {
  const response = await axios.get(
    "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    {
      headers: {
        "X-RapidAPI-Key": process.env.GEODB_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
      params: {
        countryIds: countryCode,
        limit: 10,
        sort: "-population",
      },
    }
  );

  return response.data.data;
};
