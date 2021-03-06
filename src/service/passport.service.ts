import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt'
import keys from '../config/keys.config';
import UserModel from '../model/User.model';



//Create a passport middleware to handle user registration
const authPassport = () => {
    passport.use('signup', new localStrategy({ 
        usernameField : 'email', 
        passwordField : 'password'
    }, async (email, password, done) => {        
        try { 
            console.log('====Start Signup====');
            //Save the information provided by the user to the the database         
            const user = await UserModel.create({ email, password }); 
            //Send the user information to the next middleware             
            return done(null, user); 
            
        } catch (error) { 
            // console.log(error);
            done(error); 
        }
    }));

    //Create a passport middleware to handle User login
    passport.use('login', new localStrategy({ 
        usernameField : 'email', 
        passwordField : 'password'
    }, async (email, password, done) => { 
        try { 
            //Find the user associated with the email provided by the user 
            const user = await UserModel.findOne({ email }); 
            if( !user ){ 
                //If the user isn't found in the database, return a message 
                return done(null, false, { message : 'User not found'}); 
            } 
            //Validate password and make sure it matches with the corresponding hash stored in the database 
            //If the passwords match, it returns a value of true.             
            const validate = await user.isValidPassword(password); 
            if( !validate ){ 
                return done(null, false, { message : 'Wrong Password'}); 
            } 
            //Send the user information to the next middleware 
            return done(null, user, { message : 'Logged in Successfully'}); 
        } catch (error) { 
            return done(error); 
        }
    }));

    //This verifies that the token sent by the user is valid
    passport.use(new JWTstrategy({ 
        //secret we used to sign our JWT 
        secretOrKey : keys.jwtKey, 
        //we expect the user to send the token as a query parameter with the name 'secret_token' 
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (token, done) => { 
        try { 
            //Pass the user details to the next middleware 
            return done(null, token.user); 
        } 
        catch (error) { 
            done(error); 
        }
    }));
}

export default authPassport;