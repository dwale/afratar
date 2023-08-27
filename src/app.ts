require("dotenv").config();

import express from "express";
import { getRandomImage } from "./routes";
import { errorMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received request for: ${req.method} ${req.url}`);
  next();
});
app.get("/ping", (_req: any, res: { send: (arg0: string) => any }) =>
  res.send(`pong`)
);

app.use("/v1", getRandomImage);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.all("*", (req, res, next) => {
  res.status(404);
  next(
    res.json({
      message: "Route not found",
      code: "404",
    })
  );
});

app.use(errorMiddleware);

module.exports = app;
