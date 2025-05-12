import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const ListingDetail = ({ listing, open, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const allImages = [
    listing.image,
    ...(listing.additionalImages || [])
  ].filter(Boolean);

  const handleImageNavigation = (direction) => {
    if (direction === 'next') {
      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">{listing.breed} - {listing.age}</DialogTitle>
            <Badge className={listing.type === "sell" ? "bg-green-500" : "bg-blue-500"}>
              {listing.type === "sell" ? "For Sale" : "Wanted"}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          {allImages.length > 0 && listing.type == "sell" &&(
            <div className="mb-6 relative">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={allImages[activeImageIndex]} 
                  alt={listing.breed} 
                  className="w-full h-80 object-cover" 
                />
                
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {allImages.length > 1 && (
                <div className="mt-4 flex space-x-3 overflow-x-auto py-1">
                  {allImages.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded cursor-pointer flex-shrink-0 border-2 ${idx === activeImageIndex ? 'border-green-500' : 'border-gray-200'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${listing.breed} view ${idx+1}`} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium">{listing.gender}</p>
            </div>
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-medium">{listing.price}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{listing.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Posted</p>
              <p className="font-medium">{new Date(listing.date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">{listing.description}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
            <p className="mb-1">Contact Name: {listing.contact_name}</p>
            <p className="mb-1">Contact Number: {listing.contact_number}</p>
            <p className="text-sm text-gray-500"></p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={onClose} 
              className="bg-green-700 hover:bg-green-800"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetail;
