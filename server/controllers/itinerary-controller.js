import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const add = async (req, res) => {
  try {
    const result = await knex("itineraries").insert({
      user_id: req.body.user_id,
      location: req.body.location,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      itinerary_name: req.body.itinerary_name,
    });

    const newItineraryId = result[0];
    const createdItinerary = await knex("itineraries").where({ id: newItineraryId });
    res.status(201).json(createdItinerary);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new itinerary: ${error}`,
    });
  }
};

export { add };
