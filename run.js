import radiosCron from "./cron/radios.cron.js";
import app from "./src/app.js";
import cron from "node-cron";
import { criarDatabase } from "./src/repository/radios.repository.js";

criarDatabase();
app.listen(3000, ()=>{
    console.log('Server ok!');
    cron.schedule("0 0 1 * *", radiosCron);
}); 