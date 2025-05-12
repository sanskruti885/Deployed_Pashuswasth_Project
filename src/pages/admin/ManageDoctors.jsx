import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]); // Store original unfiltered data
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  // Fetch doctors data
  const get_doctor = async () => {
    const res = await fetch("http://localhost:4000/doctor/getDoctors");
    const rec_data = await res.json();
    setDoctors(rec_data.data);
    setAllDoctors(rec_data.data); // Store original data
  };

  useEffect(() => {
    get_doctor();
  }, []);

  
    
    // Apply search filter
   
   const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone.includes(searchTerm) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())||
        doctor.experience.toLowerCase().includes(searchTerm.toLowerCase())
   )

    // Apply specialization filter
    // if (specializationFilter) {
    //   filteredDoctors = filteredDoctors.filter(doctor =>
    //     doctor.specialty.toLowerCase() === specializationFilter.toLowerCase()
    //   );
    // }



  // ... rest of your
   
 // Make sure to call `get_doctor` only once when the component mounts

  const handleDelete = async (doctorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:4000/doctor/deleteDoctor/${doctorId}`);
      if (response.status === 200) {
        toast({ title: "Doctor Deleted", description: "The doctor record has been removed." });
        get_doctor(); // Refresh list of doctors
      } else {
        throw new Error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({ title: "Delete Failed", description: "Could not delete doctor.", variant: "destructive" });
    }
  };

  const handleEdit = (doctor) => {
    console.log(doctor.resourceId)
    navigate("/admin/add-doctor", { state: { doctor , resourceId: doctor._id || doctor.resourceId} });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Manage Veterinarians</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove veterinarians from the platform</p>
        </div>
        <Link to="/admin/add-doctor">
          <Button className="bg-green-700 hover:bg-green-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Doctor
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Doctor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {/* <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Filter by Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select> */}
              {/* <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Filter by Specialization</option>
                <option value="medicine">Medicine</option>
                <option value="surgery">Surgery</option>
                <option value="reproduction">Reproduction</option>
                <option value="nutrition">Nutrition</option>
              </select> */}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors..."
                className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                onChange = {(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-50 text-left">
                  <th className="px-4 py-3 text-green-800 font-semibold">Name</th>
                  <th className="px-4 py-3 text-green-800 font-semibold">Specialization</th>
                  <th className="px-4 py-3 text-green-800 font-semibold">Location</th>
                  <th className="px-4 py-3 text-green-800 font-semibold">Contact</th>
                  {/* <th className="px-4 py-3 text-green-800 font-semibold">Status</th> */}
                  <th className="px-4 py-3 text-green-800 font-semibold">Rating</th>
                  <th className="px-4 py-3 text-green-800 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id || doctor.resourceId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{doctor.name}</div>
                      <div className="text-xs text-gray-500">{doctor.experience} experience</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{doctor.specialty}</td>
                    <td className="px-4 py-3 text-gray-700">{doctor.location}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700">{doctor.phone}</div>
                      <div className="text-xs text-gray-500">{doctor.email}</div>
                    </td>
                    {/* <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doctor.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {doctor.status === "Verified" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {doctor.status}
                      </span> */}
                    {/* </td> */}
                    <td className="px-4 py-3 text-gray-700">{doctor.rating}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(doctor)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(doctor._id || doctor.resourceId)} // Pass doctorId dynamically
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        {doctor.status === "Pending" && (
                          <Button
                            size="sm"
                            className="h-8 px-3 bg-green-700 hover:bg-green-800 text-xs"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">Showing 1-5 of 5 doctors</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDoctors;
