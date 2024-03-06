import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => console.log(`Hearing in port ${PORT}`));
