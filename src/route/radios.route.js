import { Router } from "express";
import { atualizacaoManual, pegarRadioController, pegarRadioPorCategoriacController, todasAsRadiosController } from "../controller/radios.controller.js";

const radios = Router();

radios.get("/radio", pegarRadioController);
radios.get("/radio/:categoria", pegarRadioPorCategoriacController);
radios.get("/allRadios", todasAsRadiosController);
radios.post("/manualSync", atualizacaoManual);

radios.get("/", (req, res) => {
    res.status(200).send({
        title: "API Radios",
        version: "1.0.0"
    });
});

export default radios;
