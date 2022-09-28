import pool from "../config/pg.config.js";

async function pegarRadioComFitroRepository(parametros){
    const {nome, cidade, estado, pais} = parametros;
     try{
        const resultado = pool.query(`SELECT nome, cidade, estado, regiao, pais, url, segmentos FROM pandora_radio.radios WHERE 1=1 
        ${nome != undefined ? `and nome ILIKE '%${nome}%' `: ``} 
        ${cidade != undefined ? `and cidade ILIKE '%${cidade}%' ` : ``} 
        ${estado != undefined ? `and estado ILIKE '%${estado}%' ` : ``} 
        ${pais != undefined ? `and pais ILIKE '%${pais}%' ` : ``} `);
        return resultado;
    }catch(e){
        return e;
    } 
}

async function todasAsRadiosRepository(){
    try{
        const resultado = pool.query('SELECT nome, url, cidade, estado, regiao, pais, segmentos FROM pandora_radio.radios');
        return resultado;
    }catch(e){
        return e;
    }
}

async function inserirRadioRepository(dados){
    const {radio, segmentos, cidade, estado, regiao, pais, url,status} = dados;
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        await client.query(`INSERT INTO pandora_radio.radios(nome, cidade, estado, regiao, pais, url, segmentos,status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [radio, cidade, estado, regiao, pais, url, segmentos,status]);
        await client.query('COMMIT');
        client.release();
    }catch(e){
        console.log(e);
        client.query('ROLLBACK');
    }
}

export {pegarRadioComFitroRepository, todasAsRadiosRepository, inserirRadioRepository}