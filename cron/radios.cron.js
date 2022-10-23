import { inserirRadioController } from "../src/controller/radios.controller.js";

let errorCount = 0;
let i = 0;

async function radiosCron(){
    setInterval(async function() {
        if(errorCount > 1000) {
            clearInterval(this); 
            console.log("Finalizado no ID: " + i)
        };
        try{
            await inserirRadioController(++i);
            errorCount = 0;
        }
        catch(e){
            errorCount++;
        }
    }, 30*1);
}

export default radiosCron;