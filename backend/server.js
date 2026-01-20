import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/v1", routes);

const port = 8080;

app.listen(port, () => {
  console.log("Servidor rodando.");
});
