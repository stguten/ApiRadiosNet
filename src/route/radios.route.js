import { Router } from "express";
import { atualizacaoManual, pegarRadioController, todasAsRadiosController } from "../controller/radios.controller.js";

const radios = Router();

radios.get("/radio",pegarRadioController);
radios.get("/allRadios",todasAsRadiosController);
radios.post("/manualSync",atualizacaoManual);

export default radios;