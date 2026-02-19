import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    isApproved:{
        type:Boolean,
        default:false
    },

    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },

}, { timestamps:true });


// Hash password before save
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
});

const User = mongoose.model("User",userSchema);
export default User;
