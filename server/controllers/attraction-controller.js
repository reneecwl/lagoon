import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const findAttractions = async (req, res) => {
  try {
    const attractionFound = await knex("attractions").where({ location: req.query.location });
    if (attractionFound.length === 0) {
      return res.status(404).json({
        message: `We can't find any things to do in ${req.query.location}`,
      });
    }
    res.status(200).json(attractionFound);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving Things to do.");
  }
};

export { findAttractions };
