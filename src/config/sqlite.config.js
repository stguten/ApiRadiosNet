import sqlite3 from "sqlite3";
sqlite3.verbose();

const database = new sqlite3.Database('./.data/radiosnet.db');

export default database;