import express from 'express';
import { router } from './router.js';
import * as dotenv from 'dotenv';
dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        // Configurar los encabezados CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Permitir los métodos HTTP especificados
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Permitir los encabezados especificados
            next();
        });
        this.app.use('/api', router);

    }

    async listen() {
        const PORT = process.env.PORT|| 3080; // Define PORT with const
        this.app.listen(PORT, () => {
            console.log(`Workin on port ${PORT}`);
        });
    }
}

export { Server }; // Export the class as Server
