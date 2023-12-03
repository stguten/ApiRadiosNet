import cron from 'node-cron';
import { inserirRadioController } from '../src/controller/radios.controller.js';

async function radiosCron() {
  const maxErrorCount = 1000;
  //const intervalTime = 30 * 1; // 30 milisegundos
  let errorCount = 0;
  let i = 0;
  do {
    try {
      await inserirRadioController(i++);
      errorCount = 0;
    } catch (e) {
      errorCount++;
    }
    //await sleep(intervalTime);
  } while (errorCount <= maxErrorCount);

  console.log("Finalizado no ID: " + (i));
}

const rotinaSalvarRadios = cron.schedule('0 3 1 * *', radiosCron);

export default rotinaSalvarRadios;
export { radiosCron };