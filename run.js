import rotinaSalvarRadios from "./cron/radios.cron.js";
import app from "./src/app.js";
import { criarTabelas } from "./src/repository/radios.repository.js";

criarTabelas();

app.listen(3000, ()=>{
    console.log("Servidor Inicializado.");
    rotinaSalvarRadios.start();
}); 