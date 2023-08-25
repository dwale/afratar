import express from "express";
import * as s3Controller from "../controllers";

export const s3Router: express.Router = express.Router();



s3Router.route("/images").get(s3Controller.getImage);
