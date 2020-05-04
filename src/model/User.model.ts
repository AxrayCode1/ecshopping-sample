import { Document, Model, model, Schema, Query } from "mongoose"
import bcrypt from 'bcrypt';

interface IUserSchema extends Document {
    email: string,
    password: string
};

const UserSchema = new Schema({ 
    email : { 
        type : String, 
        required : true, 
        unique : true 
    }, 
    password : { 
        type : String, 
        required : true 
    }
});
  
export interface IUserBase extends IUserSchema {    
    isValidPassword(password: string): boolean;
}

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password: any){ 
    const user = this; 
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false. 
    const compare = await bcrypt.compare(password, user.password); 
    return compare;
}

UserSchema.pre<IUserBase>('save', async function(next){ 
    //'this' refers to the current document about to be saved 
    const user = this;     
    //Hash the password with a salt round of 8, the higher the rounds the more secure, but the slower //your application becomes. 
    if (user.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 8); 
        //Replace the plain text password with the hash and then store it 
        this.password = hash; 
    }
    //Indicates we're done and moves on to the next middleware 
    next();
});


const UserModel =  model<IUserBase, Model<IUserBase>>("User", UserSchema)

export default UserModel;