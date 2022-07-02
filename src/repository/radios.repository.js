import database from "../config/sqlite.config.js";

async function pegarRadioRepository(radioId){
    const id = parseInt(radioId);
    return new Promise((resolve, reject) =>{
        database.get("SELECT DISTINCT "+
            "nome, "+
            "trim(substr(local,0,instr(local,'/'))) as municipio, "+
            "trim(substr(local,instr(local,'/')+1)) as estadoPais, "+
            "link, "+
            "status_nome as status "+
            "FROM radios "+
            "JOIN status ON radios.status = status.id "+
            "WHERE radios.id= ?", [id], (err, row)=>{
                if(err) throw err;
                if(row === undefined) resolve(false);
                resolve(row);
            }
        )
    })
}

async function todasAsRadiosRepository(){
    return new Promise((resolve, reject) =>{
        database.all("SELECT DISTINCT "+
            "nome, "+
            "trim(substr(local,0,instr(local,'/'))) as municipio, "+
            "trim(substr(local,instr(local,'/')+1)) as estadoPais, "+
            "link, "+
            "status_nome as status "+
            "FROM radios "+
            "JOIN status ON radios.status = status.id", (err, row)=>{
                if(err) throw err;
                if(row === undefined) resolve(false);
                resolve(row);
            }
        )
    })    
}

async function inserirRadioRepository(data){
    database.serialize(()=>{
        try{
            database.run("BEGIN");
            database.run("INSERT OR IGNORE INTO radios(id,nome,local,link,status) VALUES (?,?,?,?,?)", data);
            database.run("COMMIT");
        }catch(e){
            database.run("ROLLBACK");
            console.log(e);
        }
    })
}

export {pegarRadioRepository, todasAsRadiosRepository, inserirRadioRepository}