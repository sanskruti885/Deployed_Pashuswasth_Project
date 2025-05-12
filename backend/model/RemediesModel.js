import mongoose from "mongoose";

const remediesSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    symptom: {type: String, default: ''},
    link: {type: String, default: ''}
}, { collection: 'HomeRemedies'});

const HomeRemedies = mongoose.model.HomeRemedies || mongoose.model('HomeRemedies', remediesSchema);

export default HomeRemedies