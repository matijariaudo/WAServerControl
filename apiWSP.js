import { Wsp } from "./waSesion.js";


const sendMessage=async(req,res)=>{
    const {instanceId,message,to}=req.body;
    const wsp=new Wsp();
    const instance=await wsp.getInstance(instanceId)
    if(!instance){return res.status(200).json({status:"error",error:"Incorrect instanceID value."})}
    const data=await instance.getProp()
    if(data.session!="connect"){return res.status(200).json({status:"error",error:"The session must be connected."})}
    try {
        const msg=await instance.send({to,msg:message})
        return res.status(200).json({status:"OK",data:"enviado"})
    } catch (error) {
        return res.status(200).json({status:"error",error})
    }
}

export	{sendMessage}