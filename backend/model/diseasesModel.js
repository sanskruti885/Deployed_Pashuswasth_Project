import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
    name: String,
    link: String,
  },{collection:'Diseases'});  //Small c is IMP
  
  const Disease = mongoose.model.DiseaseSchema || mongoose.model("Disease", DiseaseSchema);
  
export default Disease