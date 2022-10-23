import pool from "../config/pg.config.js";
import {readFileSync} from 'fs';

async function pegarRadioComFitroRepository(parametros){
    const {nome, cidade, estado, pais} = parametros;
     try{
        const resultado = await pool.query(`SELECT nome, cidade, estado, regiao, pais, url, segmentos FROM pandora_radio.radios WHERE 1=1 
        ${nome != undefined ? `and nome ILIKE '%${nome}%' `: ``} 
        ${cidade != undefined ? `and cidade ILIKE '%${cidade}%' ` : ``} 
        ${estado != undefined ? `and estado ILIKE '%${estado}%' ` : ``} 
        ${pais != undefined ? `and pais ILIKE '%${pais}%' ` : ``} `);
        return resultado.rows;
    }catch(e){
        return e;
    } 
}

async function todasAsRadiosRepository(){
    try{
        const resultado = await pool.query('SELECT nome, url, cidade, estado, regiao, pais, segmentos FROM pandora_radio.radios');
        return resultado.rows;
    }catch(e){
        throw e;
    }
}

async function inserirRadioRepository(dados){
    const {radio, segmentos, cidade, estado, regiao, pais, url,status} = dados;
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        await client.query(`INSERT INTO pandora_radio.radios(nome, cidade, estado, regiao, pais, url, segmentos,status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT(url) DO NOTHING`, [radio, cidade, estado, regiao, pais, url, segmentos,status]);
        await client.query('COMMIT');
        client.release();
    }catch(e){
        await client.query('ROLLBACK');
        throw e;
    }
}

async function criarDatabase (){
    const client = await pool.connect(); 
    try{
        const sql = readFileSync('./src/sql/db.sql','utf8');
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
    }catch(err){
        await client.query('ROLLBACK');
        throw err;
    }finally{
        client.release();
    }
}

export {pegarRadioComFitroRepository, todasAsRadiosRepository, inserirRadioRepository, criarDatabase}