import express from "express";
import * as getRandomImageController from "../controllers";
import { validateGetRandomImageQuery } from "../validators";

export const getRandomImage: express.Router = express.Router();

getRandomImage
  .route("/images/:imageId")
  .get(validateGetRandomImageQuery, getRandomImageController.getImage);
