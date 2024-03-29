import { Wsp } from "../../waSesion.js";


const getInfoInstances=async(req,res)=>{
    const wsp=new Wsp();
    const info=await wsp.getInfo();
    return res.status(200).json({info})
}
export {getInfoInstances}