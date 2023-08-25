import express from "express";
import * as s3Controller from "../controllers";
import { validateGetRandomImageQuery } from "../validators";

export const s3Router: express.Router = express.Router();

s3Router
  .route("/images")
  .get(validateGetRandomImageQuery, s3Controller.getImage);
