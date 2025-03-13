import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const itineraryList = async (_req, res) => {
  try {
    const allitineraries = await knex("itineraries");
    res.status(200).json(allitineraries);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving itinerary list.");
  }
};

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
    const createdItinerary = await knex("itineraries").where({ id: newItineraryId }).first();
    console.log(createdItinerary);
    res.status(201).json(createdItinerary);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new itinerary: ${error}`,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const itineraryFound = await knex("itineraries").where({ id: req.params.id });
    if (itineraryFound.length === 0) {
      return res.status(404).json({
        message: `Itinerarywith ID ${req.params.id} not found`,
      });
    }
    const itineraryData = itineraryFound[0];

    res.status(200).json(itineraryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve itinerary with ID ${req.params.id}`,
    });
  }
};
export { add, itineraryList, findOne };
