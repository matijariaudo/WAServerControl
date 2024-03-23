import { Wsp } from "./waSesion.js"


const InitWA=async()=>{

    for (let i = 0; i < 6; i++) {
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