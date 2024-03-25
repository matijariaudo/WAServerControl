import { Router } from "express"
import { Wsp } from "./waSesion.js"
import { sendMessage } from "./apiWSP.js";


const router=Router()
router.get('/api',async(req,res)=>{
    const wsp=new Wsp();
    const info=await wsp.getInfo();
    return res.status(200).json({info})
});

router.post('/api',async(req,res)=>{
    const wsp=new Wsp();
    const info=await wsp.getInfo();
    return res.status(200).json({info})
});
router.post('/instance/send',sendMessage);
router.post('/send',sendMessage);
router.post('/send',sendMessage);
router.post('/send',sendMessage);

export {router}