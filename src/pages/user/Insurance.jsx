import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InsuranceSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/insurance')
      .then(res => {
        if (Array.isArray(res.data)) {
          setSchemes(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching insurance data:", err);
      });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Insurance Schemes for Cattle and Buffaloes</h2>

      {schemes.length === 0 ? (
        <p className="text-gray-500">No schemes found.</p>
      ) : (
        <ul className="space-y-4">
          {schemes.map((scheme, index) => (
            <li key={index} className="border rounded-lg p-4 bg-white shadow-md">
              <h3 className="text-xl font-semibold text-green-700">{scheme.title}</h3>
              <p className="text-sm text-gray-700 my-2">{scheme.snippet}</p>
              <a href={scheme.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                More Info
              </a>
              <p className="text-xs text-gray-400 mt-2">Source: {scheme.source}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsuranceSchemes;
