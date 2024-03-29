import { Router } from "express"
import { Wsp } from "./waSesion.js"
import { getChats, getConctacts, getMessages, sendMessage } from "./instance/particular/apiWSP.js";
import { showDataCpu } from "./apiCPU.js";
import { getInfoInstances } from "./instance/general/status.js";
import { InitWA } from "./WAAdmin.js";

const router=Router()
router.get('/instances',getInfoInstances);

//General de instances
router.post('/instances/info',getInfoInstances);
router.post('/instances/start',(req,res)=>{
    InitWA();
    res.status(200).json({status:"OK"})
});

//Particular instancias
router.post('/instance/send',sendMessage);
router.post('/instance/chats',getChats);
router.post('/instance/messages',getMessages);
router.post('/instance/contact',getConctacts);

//Control de consumo
router.post('/control/cpu',showDataCpu);

export {router}