import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
