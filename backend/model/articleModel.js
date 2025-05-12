import mongoose from "mongoose";

const ArticlesSchema = new mongoose.Schema({
    title: String,
    link: String,
    image: String,
    snippet: String,
    source: String
  },{collection:'Articles'});  //Small c is IMP
  
  const Articles = mongoose.model("Articles", ArticlesSchema) || mongoose.model.ArticlesSchema;
  
export default Articles