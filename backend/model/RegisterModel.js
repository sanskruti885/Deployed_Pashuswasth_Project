import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    language: { type: String, default: "english" },
    usertype: {type:String, default:"Farmer"}
  },{  collection: 'Register', timestamps: true},
  
);

const Register = mongoose.model.Register || mongoose.model("Register", registerSchema);
export default Register;
