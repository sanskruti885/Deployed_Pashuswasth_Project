
import React from "react";
import AddDoctorForm from "../../components/AddDoctorForm";

const AddDoctor = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Add New Doctor</h1>
        <p className="text-gray-600 mt-1">Add a new veterinarian to the platform</p>
      </div>
      
      <AddDoctorForm />
    </div>
  );
};

export default AddDoctor;
