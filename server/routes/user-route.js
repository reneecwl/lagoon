import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route("/").post(userController.addUsername);

export default router;
