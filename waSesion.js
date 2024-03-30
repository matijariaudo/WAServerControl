import pkg from 'whatsapp-web.js';
const { LocalAuth,Client } = pkg;

//const Phone=require('./phone');
import fsExtra from 'fs-extra'

class Instances{
    constructor(id){
        this.id=id;
        this.qr="";
        this.phone={}
        this.session="initializing";
        this.qrqty=0;
        
    }
    async init(){
        console.log("Starting: "+this.id)
        return new Promise(async(resolve, reject) => {
            let primera=true;
            this.client = new Client({authStrategy: new LocalAuth({ clientId: this.id }), puppeteer: {headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'],ignoreHTTPSErrors: true,defaultViewport: { width: 800, height: 600 }}});
            this.client.on('qr', async(qr) => {
                this.qr=qr;
                this.session="pending";
                console.log("Needing QR: ",this.id)
                this.qrqty++;
                if(primera){
                    primera=false;
                    
                }
                resolve(true);
            });
            this.client.on('authenticated',async()=>{
                console.log("Auth: ",this.id)
            })
            this.client.on('ready', async(aaa)=>{
                //obtenerSocket.getInstance().io.emit('recibir',{nro:this.nro,connection:"online"})
                this.session="connect";this.qr="";primera=false;
                console.log("Ready to use: "+this.id);
                this.phone=await this.client.info.wid;
                resolve(true);
            });
            this.client.on('disconnected', async(r) => {
                primera=false;console.log("Issue: "+this.id);
                try {
                    this.destroyInstance();                
                } catch (error) {
                    console.error("Error al ejecutar destroyInstance():", error);
                    // Puedes agregar cualquier manejo adicional de errores aquí
                }
            });
            this.client.on('message', message => {
                //console.log("+"+message.from.split("@")[0],message.body);
            });
            await this.client.initialize();
            resolve(true);
        });
    }

    async destroyInstance(){
        console.log("eliminar instancia")
        if(this.session=='connect'){
            await this.client.logout();
        }
        if(this.session=='connect' || this.session=='pending'){
            await this.client.destroy();
            this.session="disconnect";
            this.qr="";
            const wsp=new Wsp();
            await wsp.deleteIntance(this.id);
            return true;
        }
        return false;
    }

    async forceDestroyInstance(){
        //await this.client.destroy();
        this.session="disconnect";
        this.qr="";
        const wsp=new Wsp();
        await wsp.deleteIntance(this.id);
        return true;
    }

    async stopInstance(){
        if(this.session=='connect' || this.session=='pending'){
            await this.client.destroy();
            const wsp=new Wsp();
            await wsp.deleteIntance(this.id,false);
            this.session="disconnect";
            this.qr="";
            return true;
        }
        return false;
    }

    async getProp(){
        return {qr:this.qr,id:this.id,session:this.session,phone:this.phone,qrqty:this.qrqty};
    }

    async status(){
        return new Promise((resolve, reject) => {
            const estado = this.client.getState();
            if(estado) resolve(estado)        
        })
    }

    async cerrar_sesion(){
        return true;
    }

    async send({to,msg,url}){
        return new Promise(async(resolve, reject) => {
            try {
                const chatId = to.substring(1) + "@c.us";
                if(url){
                    const media=await MessageMedia.fromUrl(url)
                    this.client.sendMessage(chatId, media);
                }
                this.client.sendMessage(chatId, msg);
                resolve(true)
            } catch (error) {
                reject(error)    
            }
                   
        })
    }

    async getChats(){
        const chats=await this.client.getChats();
        return chats
    }
    async getChat(chatId,qty=20){
        const chat=await this.client.getChatById(chatId);
        return chat
    }

    async getMessages(chatId,qty=20){
        const chat=await this.client.getChatById(chatId);
        const messages = await chat.fetchMessages({ limit: qty });
        return messages
    }

    async getConctacts(){
        const contacts=await this.client.info.wid;
        return contacts;
    }
    

}

class Wsp {
    constructor() {
      this.instancias = {};
      if (Wsp.instance) {
        return Wsp.instance;
      }
      Wsp.instance = this;
      return this;
    }
  
    async createInstance(id) {
      if (!this.instancias[id]) {
        console.log("New instance ",id)
        this.instancias[id] =new Instances(id);
        console.log("Se envio a")
        const envio=await this.instancias[id].init()
        console.log("Se envio", envio)
      }
      return this.instancias[id];
    }
    async getInstance(id) {
        if (!this.instancias[id]) {
            return false;
        }
        return this.instancias[id];
    }

    async deleteIntance(id,deleteCookies=true){
        delete this.instancias[id]
        if(deleteCookies){
            console.log("Delete instance data: ",id)
            fsExtra.remove('./.wwebjs_auth/session-'+id);
        }
        console.log("Deleted instance: ",id)
    }

    async getInfo(){
        const key=Object.keys(this.instancias)
        const rta=[]
        key.forEach(async(e) => {
          rta.push(await this.instancias[e].getProp())  
        });
        return rta
    }
}

export {Wsp}


