import express from "express";
import * as attractionController from "../controllers/attraction-controller.js";

const router = express.Router();

router.route("/").get(attractionController.findAttractions);

export default router;
