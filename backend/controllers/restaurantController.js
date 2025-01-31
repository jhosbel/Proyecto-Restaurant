const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const searchRestaurants = async (req, res) => {
  const { location, radius = 1500, type = "restaurant" } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const nearbyResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_API_KEY}`
    );

    const restaurants = await Promise.all(
      nearbyResponse.data.results.map(async (place) => {
        const detailsResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,types,photos,rating,opening_hours&key=${process.env.GOOGLE_API_KEY}`
        );

        const details = detailsResponse.data.result;

        const images = details.photos
          ? details.photos.map((photo) => ({
              url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_API_KEY}`,
              photo_reference: photo.photo_reference,
            }))
          : [];

        return {
          name: details.name,
          address: details.formatted_address,
          rating: details.rating,
          types: details.types,
          placeId: details.place_id,
          images: images,
          openingHours: details.opening_hours ? details.opening_hours.weekday_text : null,
        };
      })
    );

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching restaurants" });
  }
};

module.exports = { searchRestaurants };
