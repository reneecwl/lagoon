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

    res.status(201).json(createdItinerary);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new itinerary: ${error}`,
    });
  }
};

const edit = async (req, res) => {
  try {
    const updateItineraryDetails = await knex("itineraries").where({ id: req.params.id }).update({
      id: req.params.id,
      user_id: req.body.user_id,
      location: req.body.lcoation,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      itinerary_name: req.body.itinerary_name,
    });
    if (updateItineraryDetails === 0) {
      return res.status(404).json({ message: `Itinerary with ID ${req.params.id} not found` });
    }
    const updatedItinerary = await knex("itineraries")
      .select("id", "user_id", "location", "start_date", "end_date", "itinerary_name")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(500).json({
      message: `Unable to edit trip name: ${error}`,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const itineraryFound = await knex("itineraries")
      .where({ id: req.params.id })
      .select("id", "user_id", "location", "start_date", "end_date", "itinerary_name");
    if (itineraryFound.length === 0) {
      return res.status(404).json({
        message: `Itinerarywith ID ${req.params.id} not found`,
      });
    }
    const itineraryData = itineraryFound[0];

    const attractionsFound = await knex("itinerary_attraction")
      .join("attractions", "attractions.id", "itinerary_attraction.attraction_id")
      .where({ itinerary_id: req.params.id })
      .select("id", "day", "attraction_name", "description", "suggested_duration", "tags", "user_notes", "image");

    itineraryData.attractions = attractionsFound;

    res.status(200).json(itineraryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve itinerary with ID ${req.params.id}`,
    });
  }
};

const addAttraction = async (req, res) => {
  try {
    const result = await knex("itinerary_attraction").insert({
      itinerary_id: req.params.id,
      attraction_id: req.body.attraction_id,
      user_notes: req.body.user_notes,
      day: req.body.day,
    });
    res.status(201).json({
      message: `Attraction with id ${req.body.attraction_id} is added to itienrary ${req.params.id} on Day ${req.body.day} `,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to add attraction to itinerary with ID ${req.params.id}: ${error.message}`,
    });
  }
};

const removeAttraction = async (req, res) => {
  try {
    const rowDeleted = await knex("itinerary_attraction")
      .where({ itinerary_id: req.params.id, attraction_id: req.body.attraction_id })
      .delete();

    if (rowDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Itinerary with ID ${req.params.id} and attraction_id ${req.body.attraction_id} not found` });
    }
    res.status(200).json({ message: "Attraction deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete attraction with ID:${req.body.attraction_id} in itinerary with ID:${req.params.id}: ${error.message}`,
    });
  }
};

const editNotes = async (req, res) => {
  try {
    const updateNotesDetails = await knex("itinerary_attraction")
      .where({ itinerary_id: req.params.id, attraction_id: req.body.attraction_id })
      .update({ user_notes: req.body.user_notes });

    if (updateNotesDetails === 0) {
      return res.status(404).json({
        message: `Attraction (ID:${req.body.attraction_id}) in itinerary with ID ${req.params.id} is not found`,
      });
    }

    const updatedNotes = await knex("itinerary_attraction")
      .select("itinerary_id", "attraction_id", "user_notes", "day")
      .where({ itinerary_id: req.params.id, attraction_id: req.body.attraction_id })
      .first();
    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(500).json({
      message: `Unable to edit trip notes: ${error}`,
    });
  }
};

export { add, itineraryList, findOne, addAttraction, edit, removeAttraction, editNotes };
