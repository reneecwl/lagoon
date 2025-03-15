import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const attractionList = async (_req, res) => {
  try {
    const allAttractions = await knex("attractions");
    res.status(200).json(allAttractions);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Thinsg to do.");
  }
};
export { attractionList };
