import { Wsp } from "./waSesion.js"
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const InitWA=async()=>{
    const qty=process.env.QTY_INSTANCE || 3;
    for (let i = 0; i < qty; i++) {
        //eliminarCarpeta('/.wwebjs_auth/session-'+i)
        const wsp=new Wsp();
        await wsp.createInstance(i);
        await wait(process.env.TIMEBTW || 15000);
    }
}

const wait = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

export {InitWA}

function eliminarCarpeta(ubicacionCarpeta) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
        
    const rutaCarpetaAEliminar = path.join(__dirname , ubicacionCarpeta);

    console.log(rutaCarpetaAEliminar)
    // Verificar si la carpeta existe
    if (fs.existsSync(rutaCarpetaAEliminar)) {
        // Si la carpeta existe, eliminarla recursivamente
        fs.rmSync(rutaCarpetaAEliminar, { recursive: true });
        console.log(`Carpeta ${ubicacionCarpeta} eliminada.`);
    } else {
        console.log(`La carpeta ${ubicacionCarpeta} no existe en ${rutaCarpetaAEliminar}`);
    }
}