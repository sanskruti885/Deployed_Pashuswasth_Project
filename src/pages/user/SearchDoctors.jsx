
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Star, Search } from "lucide-react";

const SearchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // Simulate loading doctors data from an API
  useEffect(() => {
    setTimeout(() => {
      const mockDoctors = async () => {
        const res = await fetch("http://localhost:4000/doctor/getDoctors");
        console.log(res)
        const rec_data = await res.json();
        setDoctors(rec_data.data)
      };
      mockDoctors()
      setFilteredDoctors(mockDoctors);
      setLoading(false);
    }, 1500);
  }, []);
  
  useEffect(() => {
    if (doctors.length > 0) {
      let results = doctors;
      
      // Filter by search term
      if (searchTerm) {
        results = results.filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by specialty
      if (selectedSpecialty !== "All") {
        results = results.filter(doctor => 
          doctor.specialty === selectedSpecialty
        );
      }
      
      setFilteredDoctors(results);
    }
  }, [searchTerm, selectedSpecialty, doctors]);
  
  const specialties = ["All", "General Veterinary", "Livestock Specialist", "Dairy Health Expert", "Bovine Reproduction", "Animal Nutrition", "Veterinary Surgery"];
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-800 mb-2">Find Veterinarians</h1>
        <p className="text-gray-600">
          Connect with qualified veterinarians specializing in bovine health
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search by name or location"
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                className={selectedSpecialty === specialty ? "bg-forest-600 hover:bg-forest-700" : ""}
                onClick={() => handleSpecialtyChange(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex">
                  <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-earth-800">{doctor.name}</h3>
                        <p className="text-forest-600 text-sm font-medium">{doctor.specialty}</p>
                      </div>
                      {/* <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                      </div> */}
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                        <span className="text-gray-600 text-sm">{doctor.location}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 text-sm mr-2 font-medium">Experience:</span>
                        <span className="text-gray-600 text-sm">{doctor.experience}</span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                      {doctor.about}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a 
                        href={`tel:${doctor.phone}`} 
                        className="inline-flex items-center text-forest-600 hover:text-forest-700 text-sm font-medium"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </a>
                      <a 
                        href={`mailto:${doctor.email}`} 
                        className="inline-flex items-center text-forest-600 hover:text-forest-700 text-sm font-medium ml-4"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </a>
                      {/* <Button className="ml-auto bg-forest-600 hover:bg-forest-700 text-sm">
                        View Profile
                      </Button> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No doctors found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or specialty selection
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchDoctors;
