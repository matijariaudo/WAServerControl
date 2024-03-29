import { Router } from "express"
import { Wsp } from "./waSesion.js"
import { sendMessage } from "./apiWSP.js";
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

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
router.post('/', (req, res) => {
    const {qty}=req.body;
    try {
        // Construir la ruta del archivo .txt
        const filePath = path.join(__dirname, '..', 'datos_server', 'uso_cpu_memoria.txt');

        // Leer el contenido del archivo .txt
        const content = fs.readFileSync(filePath, 'utf-8');

        // Responder con el contenido del archivo
        const lineas = content.split('\n').reverse().slice(0,qty*4);
        
        // Define una función para crear objetos a partir de una línea
        const crearObjeto = (linea) => {
            const partes = linea.split(';');
            return {
            timestamp: new Date(partes[0]).getTime(),
            fecha: partes[0],
            cpu: parseFloat(partes[1]),
            memoria: parseFloat(partes[2])
            };
        };
        
        // Crea un array de objetos a partir de las líneas
        const objetos = lineas.map(crearObjeto);
        
        // Agrupa los objetos por minuto
        const objetosPorMinuto = objetos.reduce((acumulador, objeto) => {
            const minuto = new Date(objeto.timestamp).toISOString().slice(0, 16);
            if (!acumulador[minuto]) {
                acumulador[minuto] = [];
            }
            acumulador[minuto].push(objeto);
            return acumulador;
        }, {});
        const dates=Object.keys(objetosPorMinuto);
        const final=[];
        dates.forEach((e,i) => {
            final.push({fecha:e,datos:objetosPorMinuto[e]})
        });

        return res.status(200).json({resultado:final});
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

export {router}