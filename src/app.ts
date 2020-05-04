import * as bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import productController from "./controller/product.controller";
import passport from 'passport';
import keyParms from './config/keys.config';
import UserModel from './model/User.model';
import authController from './controller/auth.controller';
import secureController from './controller/secureRoutes.controller';
import passportService from './service/passport.service';


dotenv.config();

passportService();

mongoose.connect(keyParms.mongoURI);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

let app = express();
app.use(express.json());
app.use(cors({
    // origin: config.corsOrigin,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use(passport.initialize());

app.use('/',authController);
// //We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }), secureController );

app.use("/api/product", productController);

export default app;