import mongoose,{ Schema, Document } from 'mongoose';

enum UserType{
    Admin='Admin',
    User='User'
}
export interface IUser extends Document {
    email: string;
    password: string;
    username:string;
    verified:boolean;
    refreshToken: string;
    userType: UserType;
}
const UserSchema:Schema<IUser> =new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true, 
        trim: true,  
    },
    password:{
       type: String,
       required: true, // This field is required
       minlength: 6, 
    },
    username:String,
    verified:{
        type:Boolean,
        default:false,
      }, 
    refreshToken: { type: String },
    userType:   { type: String, enum: Object.values(UserType), required: true,  default: UserType.User },
    


})


export const User=mongoose.model<IUser>('User',UserSchema);
