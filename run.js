import radiosCron from "./cron/radios.cron.js";
import app from "./src/app.js";
import cron from "node-cron";
import { criarStatusController } from "./src/controller/radios.controller.js";

criarStatusController();

app.listen(3000, ()=>{
    console.log('Server ok!');
    cron.schedule("0 0 1 * *", radiosCron);
}); 