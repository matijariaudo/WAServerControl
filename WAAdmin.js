import { Wsp } from "./waSesion.js"
import * as dotenv from 'dotenv'
dotenv.config()

const InitWA=async()=>{
    const qty=process.env.QTY_INSTANCE || 3;
    for (let i = 0; i < qty; i++) {
        const wsp=new Wsp()
        wsp.createInstance(i);
        await wait(60000);
    }
}

const wait = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

export {InitWA}