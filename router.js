import { Router } from "express"
import { Wsp } from "./waSesion.js"


const router=Router()
router.get('/api',async(req,res)=>{
    const wsp=new Wsp();
    const info=await wsp.getInfo();
    return res.status(200).json({info})
})

export {router}