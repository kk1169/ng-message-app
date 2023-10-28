import express from "express";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./data-source";
import { apiRouter } from "./routes/api.routes";
import cors from 'cors';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200',
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

// Database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected successfully!");
  })
  .catch((error) => console.log(error));

app.use("", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
