import mongoose from "mongoose";

const buysellSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    userId : {type:mongoose.Schema.Types.ObjectId},
    type: {type: String, enum: ["buy","sell"],default: ''},
    breed: {type: String, default: ''},
    age: {type: Number,default: '' },
    gender: {type: String, enum: ["male","female"], default: ''},
    price: {type: Number,default: -1},
    location: {type: String, default: ''},
    description: {type: String, default: ''},
    contact_name: {type: String, default: ''},
    contact_number: {type: String, default: ''},
    date: {type:Date, default: Date.now},
    image: {type: String, default: ''},
    additional_images: { type: [String], default: [] }
}, { collection: 'BuySell'});

const BuySell = mongoose.model.BuySell || mongoose.model('BuySell', buysellSchema);

export default BuySell