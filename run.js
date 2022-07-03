import radiosCron from "./cron/radios.cron.js";
import app from "./src/app.js";
import cron from "node-cron";

app.listen(3000, ()=>{
    radiosCron()
    cron.schedule("0 0 1 * *", radiosCron);
});