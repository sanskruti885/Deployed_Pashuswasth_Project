import mongoose from "mongoose";

const InsuranceSchema = new mongoose.Schema({
  title: String,
  link: String,
  snippet: String,
  source: String
}, { collection: 'InsuranceSchemes' });  // Yes, small "c" is correct!

const Insurance = mongoose.model('InsuranceSchemes', InsuranceSchema);  // <-- FIXED HERE
export default Insurance;
