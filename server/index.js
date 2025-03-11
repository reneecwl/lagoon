import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT ?? 5051;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// app.use("/api/users", userRoute);
// app.use("/api/itineraries", itineraryRoutes);
// app.use("/api/attractions", attractionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
