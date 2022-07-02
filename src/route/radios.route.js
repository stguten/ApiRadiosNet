import { Router } from "express";
import { pegarRadioController, todasAsRadiosController } from "../controller/radios.controller.js";

const radios = Router();

radios.get("/radio",pegarRadioController);
radios.get("/allRadios",todasAsRadiosController);

export default radios;