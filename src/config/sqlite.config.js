import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./.data/radios.db', (err) => {
  if (err) {
    console.error(`Erro ao conectar-se ao banco de dados: ${err}`);
  } else {
    db.run("PRAGMA journal_mode=WAL");
    db.run("PRAGMA synchronous=OFF");
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.info('Conexão com o banco de dados fechada com sucesso.');
    }
    process.exit(err ? 1 : 0);
  });
});

export default db;
