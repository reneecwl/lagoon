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

export { userList, add };
