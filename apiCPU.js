import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();


const showDataCpu=(req, res) => {
    const {qty}=req.body;
    try {
        // Construir la ruta del archivo .txt
        const filePath = path.join(__dirname, '..', 'datos_server', 'uso_cpu_memoria.txt');

        // Leer el contenido del archivo .txt
        const content = fs.readFileSync(filePath, 'utf-8');

        // Responder con el contenido del archivo
        const lineas2 = content.split('\n');
        const qtyA=lineas2.length;
        const lineas=lineas2.slice((qtyA-qty),(qtyA-1));
        
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
}

export {showDataCpu}