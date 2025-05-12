import Doctors from "../model/DoctorModel.js";

export const showDoctors = async(req,res,next)=>{
    try{
        console.log("In controller")
        const doctors = await Doctors.find({})
        console.log(doctors)
        res.status(200).json({sucess:true, data: doctors})
    }catch(err){
        next(err)
    }
}

export const addDoctor = async (req, res) => {
    try {
        console.log("Received Data in Backend:", req.body);
      const { resourceId, name, specialty, location, experience, rating, phone, email, about, image } = req.body;
  
      const newDoctor = new Doctors({
        resourceId,
        name,
        specialty,
        location,
        experience,
        rating,
        phone,
        email,
        about,
        image,
      });
  
      await newDoctor.save();
  
      return res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
      console.error("Error adding doctor:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  

  export const deleteDoctor = async (req, res) => {
    console.log("In delete doctor")
    try {
        const { id } = req.params;
        console.log("Received delete request for ID:", id);
        const deletedDoctor = await Doctors.findByIdAndDelete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor deleted successfully" });

    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Controller function to handle updating doctor information
export const updateDoctor = async (req, res) => {
  const doctorId = req.params.id; // The doctor ID is passed in the URL as a parameter
  const { name, specialty, experience, location, contactNumber, email, about } = req.body;

  try {
    // Find the doctor by ID and update their information
    const doctor = await Doctors.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update the doctor's fields
    doctor.name = name || doctor.name;
    doctor.specialty = specialty || doctor.specialty;
    doctor.experience = experience || doctor.experience;
    doctor.location = location || doctor.location;
    doctor.contactNumber = contactNumber || doctor.contactNumber;
    doctor.email = email || doctor.email;
    doctor.about = about || doctor.about;

    // Save the updated doctor information to the database
    const updatedDoctor = await doctor.save();
    return res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return res.status(500).json({
      message: "Error updating doctor information",
      error: error.message,
    });
  }
};


export default {showDoctors,addDoctor,deleteDoctor,updateDoctor}