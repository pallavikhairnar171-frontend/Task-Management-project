import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String,require: true},
  email: {type: String,require: true,unique:true},
  password: {type: String,require: true},
  verifyOtpByEmail: {type: String,default:""},
  verifyOtpExpriredAt: {type: Number,default:0},
  isVerifiredUser: {type: Boolean,default:false},
  resetOpt: {type: String,default:""},
  resetOtpExpriredAt:{type:Number,default:0},
  role:{type:String ,enum:["user","admin","manager","client"],require: true,default:"user"}

});

const userModel = mongoose.models.User || mongoose.model('User',userSchema);

export default userModel