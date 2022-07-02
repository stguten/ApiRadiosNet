import { inserirRadioController } from "../src/controller/radios.controller.js";

let errorCount = 0;
let i = 0;
setInterval(() => {
    if(errorCount > 1000) clearInterval(this);
    try{
        errorCount = 0;
        inserirRadioController(++i);
    }catch(e){
        errorCount++;
    }
}, 100*1);    