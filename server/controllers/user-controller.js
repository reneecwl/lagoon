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
      return res.status(404).json({
        message: `User with ID ${userId} not found`,
      });
    }
    const username = userExists.user_name;

    const getItineraries = await knex("itineraries")
      .select("id", "user_id", "location", "start_date", "end_date", "itinerary_name")
      .where({ user_id: userId });

    res.status(200).json({
      username: username,
      itineraries: getItineraries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Unable to retrieve itineraries for user with ID ${userId}` });
  }
};
export { userList, add, userItineraries };
