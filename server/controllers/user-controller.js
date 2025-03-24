import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const userList = async (_req, res) => {
  try {
    const users = await knex("users");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving user list.");
  }
};

const add = async (req, res) => {
  if (!req.body.user_name) {
    return res.status(400).json({
      message: "Please provide a valid username ",
    });
  }

  try {
    const username = req.body.user_name;
    let user = await knex("users").where({ user_name: username }).first();

    if (!user) {
      const result = await knex("users").insert(req.body);
      const newUserId = result[0];
      return res.status(201).json({ id: newUserId });
    }
    return res.status(200).json({ id: user.id });
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

const userItineraries = async (req, res) => {
  const userId = req.params.id;

  try {
    const userExists = await knex("users").where({ id: userId }).first();
    if (!userExists) {
      return res.status(404).json({ message: `User with ID ${userId} not found` });
    }

    const getItineraries = await knex("itineraries")
      .select("id", "user_id", "location", "start_date", "end_date", "itinerary_name")
      .where({ user_id: userId });

    if (getItineraries.length === 0) {
      return res.status(200).json({ username: userExists.user_name, itineraries: [] });
    }

    const attractionCounts = await knex("itinerary_attraction")
      .whereIn(
        "itinerary_id",
        getItineraries.map((i) => i.id)
      )
      .select("itinerary_id")
      .count("* as attraction_count")
      .groupBy("itinerary_id");

    const countsMap = {};
    attractionCounts.forEach((item) => {
      countsMap[item.itinerary_id] = parseInt(item.attraction_count, 10);
    });

    const itinerariesWithAttractionCount = getItineraries.map((itinerary) => ({
      ...itinerary,
      attraction_count: countsMap[itinerary.id] || 0,
    }));

    const sortedItineraries = itinerariesWithAttractionCount.sort((a, b) => {
      return new Date(b.start_date) - new Date(a.start_date);
    });

    res.status(200).json({
      username: userExists.user_name,
      itineraries: sortedItineraries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Unable to retrieve itineraries for user with ID ${userId}` });
  }
};
export { userList, add, userItineraries };
