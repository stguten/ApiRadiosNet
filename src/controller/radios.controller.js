import radiosCron from "../../cron/radios.cron.js";
import radioBuilder from "../builder/radio.builder.js";
import instance from "../config/axios.config.js";
import parsing from "../config/cheerio.config.js";
import { inserirRadioRepository, pegarRadioComFitroRepository, todasAsRadiosRepository } from "../repository/radios.repository.js";

const pegarRadioController = async (req,res)=>{
    const {id} = req.query;
    if(isNaN(id)) {res.send(400).send("Requisição Invalida"); return;};

    await pegarRadioComFitroRepository(id)
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

const todasAsRadiosController = async (req,res)=>{    
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

const inserirRadioController = async (id) =>{
    await instance.get(`https://www.radios.com.br/play/${id}`)
        .then(async result =>{                   
            const $ = parsing(result.data);
            if(result.request.res.responseUrl.indexOf("/error/") > 0) throw new Error('Radio não encontrada.');  
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

const updateRadioController = async (req, res) =>{

}

const atualizacaoManual = async(req,res)=>{
    const {pass} = req.body;

    if(pass == process.env.SENHA_MANUAL){
        radiosCron();
        res.status(200).send("Atulização manual iniciada")
    }
}

export {pegarRadioController,todasAsRadiosController, inserirRadioController, updateRadioController,atualizacaoManual}