import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route("/").get(userController.userList).post(userController.add);

export default router;
