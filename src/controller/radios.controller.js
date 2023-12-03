import { radiosCron } from "../../cron/radios.cron.js";
import radioBuilder from "../builder/radio.builder.js";
import instance from "../config/axios.config.js";
import parsing from "../config/cheerio.config.js";
import { inserirRadioRepository, pegarRadioRepository, todasAsRadiosRepository } from "../repository/radios.repository.js";

async function pegarRadioController(req,res){
    if(Object.keys(req.query).length == 0 || req.query.id == undefined || req.query.id == null || req.query.id == "" || isNaN(req.query.id)) {
        res.status(400).send("Requisição Invalida"); 
        return;
    };

    try {
        const radio = await pegarRadioRepository(req.query.id);
        Object.assign(radio, {categorias: radio.categorias.split(",")});

        if(!radio){
            res.status(404).send("Radio não encontrada");
            return;
        }
        res.status(200).send(radio);
    } catch (error) {
        res.status(500).send(e);        
    }
}

async function pegarRadioPorCategoriacController(req,res){
    if(Object.keys(req.param).length == 0 || req.param.categoria == undefined || req.param.categoria == null || req.param.categoria == "") {
        res.status(400).send("Requisição Invalida"); 
        return;
    };

    try {
        const radios = await pegarRadioPorCategoriaRepository(req.param.categoria);
        if(!radios){
            res.status(404).send("Radio não encontrada");
            return;
        }
        res.status(200).send(radios);
    } catch (error) {
        res.status(500).send(e);        
    }
}

async function todasAsRadiosController(req,res){    
    await todasAsRadiosRepository()
    .then(radios =>{
        if(!radios){
            res.status(503).send("VAZIO");
            return;
        }
        res.status(200).send(radios);
    })
    .catch(e =>{
        res.status(500).send(e);
    })
}

async function inserirRadioController(radioId) {
    const htmlcode = await instance.get(`http://play.radios.com.br/${radioId}`);

    try {
        const $ = parsing(htmlcode.data);
        if(htmlcode.request.res.responseUrl.indexOf("/error/") > 0) throw new Error(`Radio ${radioId} não encontrada.`);     
        switch($("#status-radio > span > b").text().replace(":","")){
            case 'Arquivada':
                inserirRadioRepository(await radioBuilder(htmlcode.data, radioId, 2));
                break;
            case 'Pré-cadastrada':
                inserirRadioRepository(await radioBuilder(htmlcode.data, radioId, 3));
                break;
            case 'Desativada':
                inserirRadioRepository(await radioBuilder(htmlcode.data, radioId, 4));
                break;
            default:
                inserirRadioRepository(await radioBuilder(htmlcode.data, radioId, 1));
                break;
        } 
    } catch (error) {
        throw new Error(error);
    }
}

async function atualizacaoManual(req,res){
    const password = req.body.pass;

    if(password == undefined || password == null || password == "" || password != process.env.SENHA_MANUAL){
        res.status(401).send("Senha invalida");
        return;
    }

    radiosCron();
    res.status(200).send("Atualização manual concluida");
}

export {pegarRadioController,todasAsRadiosController, inserirRadioController, atualizacaoManual, pegarRadioPorCategoriacController}