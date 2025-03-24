import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/user-route.js";
import itineraryRoutes from "./routes/itinerary-route.js";
import attractionRoutes from "./routes/attraction-route.js";

const PORT = process.env.PORT ?? 8081;

const app = express();
app.use(cors());
app.use(express.static("public")); //add folder
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/attractions", attractionRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
