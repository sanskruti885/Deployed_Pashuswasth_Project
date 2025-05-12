
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import  { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
const HomeRemedies = () => {
 
  const [remedies, setRemedies] = useState([]);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchRemedies = async () => {
      const res = await fetch("http://localhost:4000/api/remedies");
      const rec_data = await res.json();
      setRemedies(rec_data.data);
    };
    fetchRemedies();
  }, []);

  const filterRemedies = remedies.filter((item)=>
  item.symptom.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="bg-green-50 w-full">
    <div className="flex flex-col items-center gap-4 text-gray-900 my-10 md:mx-10 ">
        {/* <h1 className='text-3xl font-medium text-green-400'>Home Remedies</h1> */}
        {/* search box */}
        <div className="relative w-full max-w-md">
        <input type="text"
        placeholder="Search Symptom"
        className="w-full mt-3 max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        {/* <FaSearch className="absolute top-2/3 ml-200 transform -translate-y-1/2 text-gray-400" /> */}
        </div>
        
                 
        <div className='w-full grid grid-cols-1  gap-6 sm:px-0'>
       {filterRemedies.length > 0 ? (
          filterRemedies.map((item, index) => (
          <div
            key={index}
            className="flex items-center border bg-slate-50 border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all"
          >
           <iframe
              className="w-70 h-44 rounded-2xl ml-2 mt-2 mb-2"
              src={`https://www.youtube.com/embed/${getYouTubeId(item.link)}`}
              title="Remedy Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <span><div className="p-4 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-2 text-left">
              {item.symptom}</p>
            </div></span>
          </div>
        )))
        :(
          <div className="w-200 grid grid-cols-1  justify-center ml-70">
          <div className="bg-red-500 text-white px-10 py-3 rounded-md flex justify-between items-center w-200">
          <p>
            <strong>No result found!</strong> Consult A Doctor.
            
        </p>

            <button onClick={() => setShow(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>  

  
         )  
        }
        </div>
        </div>       
    </div>
  );
};

const getYouTubeId = (url) => {
  const shortLinkMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortLinkMatch) return shortLinkMatch[1];
  const longLinkMatch = url.match(/v=([^&]+)/);
  if (longLinkMatch) return longLinkMatch[1];
  return null;
};
export default HomeRemedies;
