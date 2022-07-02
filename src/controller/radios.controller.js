import instance from "../config/axios.config.js";
import parsing from "../config/cheerio.config.js";
import { inserirRadioRepository, pegarRadioRepository, todasAsRadiosRepository } from "../repository/radios.repository.js";

const pegarRadioController = async (req,res)=>{
    const {id} = req.query;
    if(isNaN(id)) {res.send(400).send("Requisição Invalida")};
    try{
        const result = pegarRadioRepository(id);
        if(!result) {
            res.send(404).send("Radio não encontrada");
            return;
        }
        res.status(200).send(result);

    }catch(e){
        res.status(500).send(e);
    }
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
            if(result.request.res.responseUrl.indexOf("/error/") > 0) return;
            const $ = parsing(result.data);
            switch($("#status-radio > span > b").text().replace(":","")){
                case 'Arquivada':
                    inserirRadioRepository([id,$("#player-infos > div.info > h1").text(),$("#player-infos > div.info > h2").text(),
                    `https://www.radios.com.br/play/playlist/${id}/listen-radio.m3u`, 2]);
                    break;
                case 'Pré-cadastrada':
                    inserirRadioRepository([id,$("#player-infos > div.info > h1").text(),$("#player-infos > div.info > h2").text(),
                    `https://www.radios.com.br/play/playlist/${id}/listen-radio.m3u`, 3]);
                    break;
                case 'Desativada':
                    inserirRadioRepository([id,$("#player-infos > div.info > h1").text(),$("#player-infos > div.info > h2").text(),
                    `https://www.radios.com.br/play/playlist/${id}/listen-radio.m3u`, 4]);
                    break;
                default:
                    inserirRadioRepository([id,$("#player-infos > div.info > h1").text(),$("#player-infos > div.info > h2").text(),
                    `https://www.radios.com.br/play/playlist/${id}/listen-radio.m3u`, 1]);
                    break;
            }
        })
        .catch(e =>{
            throw e;
        });
}

const updateRadioController = async (req, res) =>{

}
export {pegarRadioController,todasAsRadiosController, inserirRadioController, updateRadioController}