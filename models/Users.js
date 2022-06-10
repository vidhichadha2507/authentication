import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        required: [true," Please provide user email"],
        unique:true,
        match:[
           /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,"Please provide a valid email"
        
        ]
    },
password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

});




UserSchema.pre("save",async function(next) {
if (!this.isModified("password")) {
    next();
}

const salt = await bcrypt.genSalt(10);
this.password =await bcrypt.hash(this.password,salt);
next();
});


UserSchema.methods.matchPasswords= async function(password)
{
   return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

 
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); 

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

export default User;