import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const add = async (req, res) => {
  if (!req.body.user_name) {
    return res.status(400).json({
      message: "Please provide a valid username ",
    });
  }

  try {
    const result = await knex("users").insert(req.body);

    const newUserId = result[0];
    const createdUser = await knex("users").where({ id: newUserId });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

export { add };
