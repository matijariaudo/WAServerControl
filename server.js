import express from 'express';
import { router } from './router.js';
import * as dotenv from 'dotenv';
dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.app.use(express.json());
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
