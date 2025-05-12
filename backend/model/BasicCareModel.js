import mongoose from "mongoose";

const basiccareSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    care_topic: {type: String, default: ''},
    description: {type: String, default: ''},
    youtube_link: {type: String, default: '' }
}, { collection: 'BasicCare'});

const BasicCare = mongoose.model.BasicCare || mongoose.model('BasicCare', basiccareSchema);

export default BasicCare