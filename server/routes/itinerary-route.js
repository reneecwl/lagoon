import express from "express";
import * as itineraryController from "../controllers/itinerary-controller.js";

const router = express.Router();

router.route("/").get(itineraryController.itineraryList).post(itineraryController.add);

export default router;
