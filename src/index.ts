import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { CategoryRouter } from "./category/category.router";
dotenv.config();

if (!process.env.PORT) {
  console.log("can't read PORT from env");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/category", CategoryRouter);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
