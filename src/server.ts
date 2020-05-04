import app from './app'
import  serverConfig  from './config/server.config';
import { logger } from './utils/logger/logger';
import * as dotenv from 'dotenv';
dotenv.config();

const startServer = ()=>{
    try{
        app.listen(serverConfig.port, () => {
            logger.info(`env: ${process.env}`);
            logger.info(`running at port ${serverConfig.port}`);
            logger.info(`using  CORS-ORIGIN domain: [${serverConfig.corsOrigin}]`);
        })
    }catch(error){
        logger.error(error)
        process.exit(1);
    }
}

startServer();