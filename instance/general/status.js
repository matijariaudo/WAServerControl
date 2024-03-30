import { Wsp } from "../../waSesion.js";


const getInfoInstances=async(req,res)=>{
    const wsp=new Wsp();
    const info=await wsp.getInfo();
    return res.status(200).json({info})
}
const createInstance=async(req,res)=>{
    const {instanceId}=req.body;
    const wsp=new Wsp();
    const instance = await wsp.createInstance(instanceId);
    const data=instance.getProp();
    return res.status(200).json({status:"The instance has been stopped.",data})
}

const stopInstance=async(req,res)=>{
    const wsp=new Wsp();
    const {instanceId}=req.body;
    let instance=await wsp.getInstance(instanceId)
    const deleteIns = await instance.stopInstance();
    if(!deleteIns){return res.status(200).json({error:"No se pudo detener, intente nuevamente"})}
    return res.status(200).json({status:"The instance has been stopped."})
}
const deleteInstance=async(req,res)=>{
    const wsp=new Wsp();
    const {instanceId}=req.body;
    let instance=await wsp.getInstance(instanceId)
    const deleteIns = await instance.destroyInstance();
    if(!deleteIns){return res.status(200).json({error:"No se pudo detener, intente nuevamente"})}
    return res.status(200).json({status:"The instance has been deleted."})
}

const forceDeleteInstance=async(req,res)=>{
    const wsp=new Wsp();
    const {instanceId}=req.body;
    let instance=await wsp.getInstance(instanceId)
    const deleteIns = await instance.forceDestroyInstance();
    if(!deleteIns){return res.status(200).json({error:"No se pudo detener, intente nuevamente"})}
    return res.status(200).json({status:"The instance has been deleted."})
}
export {getInfoInstances,stopInstance,deleteInstance,forceDeleteInstance,createInstance}