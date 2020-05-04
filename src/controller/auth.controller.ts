import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import keys from '../config/keys.config';

const router = express.Router();

router.post('/signup', async (req, res, next) => { 
    if(!(req.body.email && req.body.password)){
        res.status(400).send();
    } else {
        passport.authenticate('signup', async (err, user, info) => { 
            console.log('Custom Callback');
            try {             
                if(err) { 
                    res.status(400).send(err);
                } 
                if(!user){
                    res.status(400).send('validate fields failure');
                }            
                req.login(user, { session : false }, async (error) => { 
                    if( error ) return next(error) 
                    //We don't want to store the sensitive information such as the 
                    //user password in the token so we pick only the email and id 
                    const body = { _id : user._id, email : user.email }; 
                    //Sign the JWT token and populate the payload with the user email and id 
                    const token = jwt.sign({ user : body },keys.jwtKey);                 
                    //Send back the token to the user 
                    res.send({ token });                    
                }); 
            } catch (error) { 
                return next(error); 
            } 
        })(req, res, next);
    }
});

router.post('/signin', async (req, res, next) => { 
    passport.authenticate('login', async (err, user, info) => { 
        try {             
            // console.log(info.message);
            if(err || !user) { 
                res.status(401).send();
            }             
            req.login(user, { session : false }, async (error) => { 
                if( error ) return next(error) 
                //We don't want to store the sensitive information such as the 
                //user password in the token so we pick only the email and id 
                const body = { _id : user._id, email : user.email }; 
                //Sign the JWT token and populate the payload with the user email and id 
                const token = jwt.sign({ user : body },keys.jwtKey);                 
                //Send back the token to the user 
                res.send({ token });
            }); 
        } catch (error) { 
            return next(error); 
        } 
    })(req, res, next);
});

export default router;