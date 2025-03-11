import express from "express";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT ?? 5051;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
