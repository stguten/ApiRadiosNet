import database from "../config/sqlite.config.js";
import * as fs from "fs";

async function pegarRadioRepository(radioId){
    const id = parseInt(radioId);
    console.log(radioId);
    return new Promise((resolve, reject) =>{
        database.get("SELECT DISTINCT nome, cidade, estado, "+
            "regiao, pais, url as link, segmentos as categorias, "+
            "descricao as status "+
            "FROM radios r "+
            "JOIN status s ON r.status = s.id "+
            "WHERE r.id = ?", [id], (err, row)=>{
                if(err) throw err;
                if(row == undefined) resolve(false);
                resolve(row);
            }
        )
    })
}

async function pegarRadioPorCategoriaRepository(categoria) {
  return new Promise((resolve, reject) => {
    database.all(
      "SELECT DISTINCT nome, cidade, estado, " +
        "regiao, pais, url as link, segmentos as categorias, " +
        "descricao as status " +
        "FROM radios r " +
        "JOIN status s ON r.status = s.id " +
        "WHERE r.segmentos LIKE ?",
      ["%" + categoria + "%"],
      (err, row) => {
        if (err) throw err;
        if (row == undefined) resolve(false);
        resolve(row);
      }
    );
  });
}

async function todasAsRadiosRepository(){
    return new Promise((resolve, reject) =>{
        database.all("SELECT DISTINCT nome, cidade, estado, "+
        "regiao, pais, url as link, segmentos as categorias, "+
        "descricao as status "+
        "FROM radio r "+
        "JOIN status s ON r.status = s.id ", (err, row)=>{
                if(err) throw err;
                if(row === undefined) resolve(false);
                resolve(row);
            }
        )
    })    
}

async function inserirRadioRepository(radio){
     database.serialize(()=>{
        try{
            database.run("BEGIN");
            database.run("INSERT OR IGNORE INTO radios (nome,cidade,estado,regiao, pais, url, segmentos, status) VALUES (?,?,?,?,?,?,?,?)", 
                [radio.nome, radio.cidade, radio.estado, radio.regiao, radio.pais, radio.url, radio.segmentos.toString(), radio.status]);
            database.run("COMMIT");
        }catch(e){
            database.run("ROLLBACK");
            console.log(e);
            return new Error("Erro ao inserir radio");
        }
    }); 
}

async function criarTabelas(){
    try{
        const sql = fs.readFileSync('./src/sql/db.sql','utf8') ;
        database.exec(sql);
        console.log('Tabelas criadas com sucesso!');
    } catch (err) {
        console.error(err);
    }
}

export {pegarRadioRepository, todasAsRadiosRepository, inserirRadioRepository, pegarRadioPorCategoriaRepository, criarTabelas}