// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function DiseaseList() {
//   const [diseases, setDiseases] = useState([]);
//   const [error, setError] = useState(null);
//   const [groupedDiseases, setGroupedDiseases] = useState({});
//   const [searchTerm, setSearchTerm] = useState(""); // Search state

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/diseases")
//       .then(response => {
//         const data = response.data;
//         console.log("Fetched Data:", data);
        
//         if (Array.isArray(data)) {
//           const grouped = groupDiseases(data);
//           setGroupedDiseases(grouped);
//         }
        
//         setDiseases(data);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch data. Please check the backend.");
//       });
//   }, []);

//   // Function to group diseases alphabetically
//   const groupDiseases = (diseaseList) => {
//     return diseaseList.reduce((acc, disease) => {
//       const firstLetter = disease.name.charAt(0).toUpperCase();
//       if (!acc[firstLetter]) acc[firstLetter] = [];
//       acc[firstLetter].push(disease);
//       return acc;
//     }, {});
//   };

//   // Filter diseases based on search term
//   const filteredDiseases = searchTerm
//     ? diseases.filter(disease => 
//         disease.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : diseases;

//   const filteredGroupedDiseases = groupDiseases(filteredDiseases);

//   return (
//     <div className="p-6">
//       {error && <p className="text-red-500">{error}</p>}

//       <div className=" top-0 left-0 w-full h-full p-4">
//         <h2 className="text-3xl font-bold text-green-600 mb-4">Disease A-Z for Cattle:</h2>

//         <div class="flex-row-reverse">
//           {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search diseases..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="absolute top-12 right-6 p-2 border border-gray-400 rounded w-64 shadow-md "
//         />
//         </div>
        

//         {/* Display Filtered & Grouped Diseases */}
//         {Object.keys(filteredGroupedDiseases).sort().map((letter) => (
//           <div key={letter} className="mb-4">
//             <h3 className="text-2xl font-bold text-green-600">{letter}</h3>
//             {filteredGroupedDiseases[letter].map((disease) => (
//               <p key={disease._id} className="text-lg font-semibold text-gray-800">
//                 <a
//                   href={`https://www.nadis.org.uk/${disease.link}`}
//                   className="text-gray-900 hover:underline hover:text-emerald-700"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {disease.name}
//                 </a>
//               </p>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function DiseaseList() {
  const [diseases, setDiseases] = useState([]);
  const [error, setError] = useState(null);
  const [groupedDiseases, setGroupedDiseases] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  useEffect(() => {
    axios.get("http://localhost:4000/api/diseases")
      .then(response => {
        const data = response.data;
        console.log("Fetched Data:", data);
        
        if (Array.isArray(data)) {
          const grouped = groupDiseases(data);
          setGroupedDiseases(grouped);
        }
        
        setDiseases(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please check the backend.");
      });
  }, []);

  // Function to group diseases alphabetically
  const groupDiseases = (diseaseList) => {
    return diseaseList.reduce((acc, disease) => {
      const firstLetter = disease.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(disease);
      return acc;
    }, {});
  };

  // Filter diseases based on search term
  const filteredDiseases = searchTerm
    ? diseases.filter(disease => 
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : diseases;

  const filteredGroupedDiseases = groupDiseases(filteredDiseases);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      <div className="relative mb-6">
        <h2 className="text-4xl font-bold text-green-700 mb-4">🩺 Cattle Diseases A-Z</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full md:w-1/2 p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-300 focus:outline-none transition"
        />
      </div>

      {/* Disease List */}
      <div className="space-y-8">
        {Object.keys(filteredGroupedDiseases).sort().map((letter) => (
          <div key={letter}>
            <h3 className="text-2xl font-semibold text-green-600 border-b-2 border-green-200 pb-1 mb-3">{letter}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredGroupedDiseases[letter].map((disease) => (
                <a
                  key={disease._id}
                  href={`https://www.nadis.org.uk/${disease.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-800 hover:text-green-700 hover:underline bg-green-50 px-4 py-2 rounded-md shadow-sm transition duration-200"
                >
                  {disease.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
