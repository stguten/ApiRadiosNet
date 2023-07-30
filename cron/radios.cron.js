import { inserirRadioController } from "../src/controller/radios.controller.js";

async function radiosCron() {
    const maxErrorCount = 1000;
    const intervalTime = 30 * 1; // 30 milisegundos
    let errorCount = 0;
  
    for (let i = 1; errorCount <= maxErrorCount; i++) {
      try {
        await inserirRadioController(i);
        errorCount = 0;
      } catch (e) {
        errorCount++;
      }
      await sleep(intervalTime);
    }
  
    console.log("Finalizado no ID: " + (i));
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export default radiosCron;