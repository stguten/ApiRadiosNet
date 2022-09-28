import { inserirRadioController } from "../src/controller/radios.controller.js";

let errorCount = 0;
let i = 0;
async function radiosCron(){
    setInterval(async () => {
        if(errorCount > 1000) {clearInterval(this); console.log("Finalizado no ID: " + i)};
        try{
            errorCount = 0;
            await inserirRadioController(++i);
        }catch(e){
            errorCount++;
        }
    }, 100*1);
}

export default radiosCron;