import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },
    name: {type: String, default: ''},
    specialty: {type: String, default: ''},
    location: {type: String, required: true, default: '' },
    experience: {type: String, default: ''},
    rating: {type: Number,default: 0},
    phone: {type: String, default: ''},
    email: {type: String, default: ''},
    about: {type: String, default: ''},
    image: {type: String, default: ''}
}, { collection: 'Doctors'});

const Doctors = mongoose.model.Doctors || mongoose.model('Doctors', doctorSchema);

export default Doctors