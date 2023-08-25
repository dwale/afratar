require("dotenv").config();

import express from "express";
import { s3Router } from "./routes";
import { errorMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received request for: ${req.method} ${req.url}`);
  next(); // Call the next middleware or route handler
});
// https://robohash.org/559939499399493949?set=1&&size=200x200
app.get("/ping", (_req: any, res: { send: (arg0: string) => any }) =>
  res.send(`pong`)
);

app.use("/v1", s3Router);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.all("*", (req, res, next) => {
  res.status(404);
  next(
    res.json({
      message: "Route not found",
    })
  );
});

app.use(errorMiddleware);

module.exports = app;
