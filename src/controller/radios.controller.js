import radiosCron from "../../cron/radios.cron.js";
import radioBuilder from "../builder/radio.builder.js";
import instance from "../config/axios.config.js";
import parsing from "../config/cheerio.config.js";
import { criarStatus, inserirRadioRepository, pegarRadioComFitroRepository, todasAsRadiosRepository } from "../repository/radios.repository.js";

async function pegarRadioController(req,res){
    if(Object.keys(req.query).length == 0) {res.status(400).send("Requisição Invalida"); return;};

    await pegarRadioComFitroRepository(req.query)
    .then(radio =>{
        if(!radio){
            res.status(404).send("Radio não encontrada");
            return;
        }
        res.status(200).send(radio);
    })
    .catch(e =>{
        res.status(500).send(e);
    })
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

async function inserirRadioController(id) {
    await instance.get(`http://play.radios.com.br/${id}`)
        .then(async result =>{    
            const $ = parsing(result.data);
            if(result.request.res.responseUrl.indexOf("/error/") > 0) throw new Error(`Radio ${id} não encontrada.`);
            switch($("#status-radio > span > b").text().replace(":","")){
                case 'Arquivada':
                    inserirRadioRepository(await radioBuilder(result.data, id,2));
                    break;
                case 'Pré-cadastrada':
                    inserirRadioRepository(await radioBuilder(result.data, id,3));
                    break;
                case 'Desativada':
                    inserirRadioRepository(await radioBuilder(result.data, id,4));
                    break;
                default:
                    inserirRadioRepository(await radioBuilder(result.data, id,1));
                    break;
            } 
        })
        .catch(e =>{
            throw e;
        });
}

async function atualizacaoManual(req,res){
    const {pass} = req.body;

    if(pass == process.env.SENHA_MANUAL){
        radiosCron();
        res.status(200).send("Atulização manual iniciada")
    }
}

function criarStatusController(){
    try{
        criarStatus(1, 'Ativa');
        criarStatus(2, 'Arquivada');
        criarStatus(3, 'Pré-Cadastrada');
        criarStatus(4, 'Desativada');        
    }
    catch(error){
        console.log("Falha ao criar as entradas de status");
        console.log(error);
    }
}

export {pegarRadioController,todasAsRadiosController, inserirRadioController, updateRadioController,atualizacaoManual, criarStatusController}