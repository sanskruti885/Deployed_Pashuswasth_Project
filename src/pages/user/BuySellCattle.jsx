import axios from "axios";
import React, { useState,useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ListingDetail from "@/components/ListingDetail";
import { uploadToCloudinary, uploadMultipleToCloudinary } from "@/lib/cloudinary";
import { Progress } from "@/components/ui/progress";
import { createCattleListing } from "./listings";
const sellFormSchema = z.object({
  breed: z.string().min(2, { message: "Breed is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  contact_name: z.string().min(3, { message: "Contact name is required" }),
  contact_number: z.string().min(10, { message: "Valid contact number is required" }),
  image: z.instanceof(File).optional()
});

const BuySellCattle = () => {
  const [cattleListings, setCattleListings] = useState([])
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedListing, setSelectedListing] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/buysell/all"); // Adjust the API URL
        console.log(response.data)
        console.log("hiii")
        setCattleListings(response.data);
        setListings(response.data)
      } catch (error) {
        console.error("Error fetching cattle listings:", error);
      }
    };fetchListings();
  }, []);

  // inorder to display my buy sell in dashboard i am saving userid to database
  

  const form = useForm({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      breed: "",
      age: "",
      type: "",
      gender: "",
      price: "",
      location: "",
      description: "",
      contact_name: "",
      contact_number: "",
      
    },
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImageFiles = Array.from(files);
      setImageFiles([...imageFiles, ...newImageFiles]);
      
      // Set the primary image for the form
      form.setValue("image", newImageFiles[0]);
      
      // Create preview URLs for all images
      const imageURLs = newImageFiles.map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...imageURLs]);
      
      // Set the preview to the first image
      setImagePreview(imageURLs[0]);
      setCurrentImageIndex(uploadedImages.length);
    }
  };

  const handleRemoveImage = (index) => {
    // Remove from preview
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    
    // Remove from files array
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);

    if (index === currentImageIndex) {
      // If removed the current preview image
      if (updatedImages.length > 0) {
        const newIndex = index === updatedImages.length ? index - 1 : index;
        setImagePreview(updatedImages[newIndex]);
        setCurrentImageIndex(newIndex);
      } else {
        setImagePreview(null);
        setCurrentImageIndex(0);
        form.setValue("image", undefined);
      }
    } else if (index < currentImageIndex) {
      // Adjust current index if removed image was before current
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleSelectImage = (index) => {
    setImagePreview(uploadedImages[index]);
    setCurrentImageIndex(index);
    
    // Update the primary image in the form
    if (imageFiles[index]) {
      form.setValue("image", imageFiles[index]);
    }
  };

  const viewListingDetails = (listing) => {
    setSelectedListing(listing);
    setDetailDialogOpen(true);
  };

const onSubmit = async (data) => {
  try {
    setUploading(true);
    setUploadProgress(10);
    
    // Upload all images to Cloudinary
    let cloudinaryUrls = [];
    
    if (imageFiles.length > 0) {
      setUploadProgress(30);
      cloudinaryUrls = await uploadMultipleToCloudinary(imageFiles);
    }
    
    setUploadProgress(70);
    
    const primaryImageUrl = cloudinaryUrls.length > 0 
      ? cloudinaryUrls[0] 
      : "https://images.unsplash.com/photo-1516305320252-5d754398b5a0?auto=format&fit=crop&w=500&h=300";
    
    const additionalImages = cloudinaryUrls.slice(1);

    const user = JSON.parse(localStorage.getItem("user"));
    const user_Id = user?.id;
    console.log(user_Id)
    // Prepare the data to send to backend
    const listingData = {
      userId: user_Id,
      type: data.type,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
      price: data.price,
      location: data.location,
      description: data.description,
      contact_name: data.contact_name,
      contact_number: data.contact_number,
      image: primaryImageUrl,
      additional_images: additionalImages,
      date: data.date
    };

    // Send to backend
    const response = await createCattleListing(listingData);
    
    setUploadProgress(90);

    // Update local state with the response from backend
    const newListing = {
      id: response.data.id,
      type: response.data.type,
      breed: response.data.breed,
      age: response.data.age,
      gender: response.data.gender,
      price: `₹${response.data.price}`,
      location: response.data.location,
      description: response.data.description,
      contact_name: response.data.contact_name,  // Add this
      contact_number: response.data.contact_number,  // Add this
      contact: `${response.data.contact_name} - ${response.data.contact_number}`,
      date: response.data.date,
      image: response.data.image,
      additionalImages: response.data.additional_images
    };

    setCattleListings([newListing, ...cattleListings]);
    setOpen(false);
    setImagePreview(null);
    setUploadedImages([]);
    setCurrentImageIndex(0);
    setImageFiles([]);
    form.reset();
    setUploadProgress(100);
    
    toast({
      title: "Listing created",
      description: "Your cattle listing has been created successfully.",
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    toast({
      title: "Error creating listing",
      description: error.response?.data?.message || "There was an error creating your listing",
      variant: "destructive"
    });
  } finally {
    setUploading(false);
    setUploadProgress(0);
  }
};
  const buyListings = cattleListings.filter(listing => listing.type === "buy");
  const sellListings = cattleListings.filter(listing => listing.type === "sell");

  const filteredListings = cattleListings.filter(listing => {
    const matchesSearch = 
      listing.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const filteredBuyListings = buyListings.filter(listing => {
    const matchesSearch = 
      listing.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const filteredSellListings = sellListings.filter(listing => {
    const matchesSearch = 
      listing.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Cattle Marketplace</h1>
      <p className="text-lg mb-8 text-gray-700">
        Connect with other farmers to buy and sell cattle. Always verify health certificates and conduct proper inspections before finalizing any transaction.
      </p>
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by breed, location..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-800">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Listing
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Sell Your Cattle</DialogTitle>
              <DialogDescription>
                Fill in the details about the cattle you want to sell. Be sure to provide accurate information.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select breed" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Holstein">Holstein</SelectItem>
                            <SelectItem value="Jersey">Jersey</SelectItem>
                            <SelectItem value="Gir">Gir</SelectItem>
                            <SelectItem value="Sahiwal">Sahiwal</SelectItem>
                            <SelectItem value="Murrah Buffalo">Murrah Buffalo</SelectItem>
                            <SelectItem value="Red Sindhi">Red Sindhi</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

         <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buy">Buy</SelectItem>
                            <SelectItem value="sell">Sell</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (in ₹)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 75,000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Anand, Gujarat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {form.watch("type") == "sell" && (
                  <div className="space-y-2">
                  <FormLabel>Upload Images</FormLabel>
                  <FormDescription>Upload multiple images of your cattle. The first image will be the main image.</FormDescription>
                  <div className="mt-1 flex items-center space-x-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <p className="text-sm text-gray-500">Click to upload images</p>
                        <p className="text-xs text-gray-400 mt-1">Images will be uploaded to Cloudinary</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Uploaded Images ({uploadedImages.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedImages.map((img, index) => (
                          <div 
                            key={index} 
                            className={`relative w-20 h-20 border rounded-md cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-green-600' : ''}`}
                            onClick={() => handleSelectImage(index)}
                          >
                            <img 
                              src={img} 
                              alt={`Cattle ${index + 1}`} 
                              className="w-full h-full object-cover rounded-md" 
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(index);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-0.5">
                                Main
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Preview</p>
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border border-gray-300" 
                        />
                      </div>
                    </div>
                  )}
                </div>
                )}
                
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your cattle, including health status, milk production, etc." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-700 hover:bg-green-800"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Submit Listing"}
                  </Button>
                </div>
                
                {uploading && (
                  <div className="mt-2">
                    <p className="text-sm mb-1">Uploading images...</p>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
            All Listings
          </TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
            For Sale
          </TabsTrigger>
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
            Wanted to Buy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="space-y-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Card key={listing.id} className={`border-l-4 ${
                  listing.type === "sell" ? "border-l-green-500" : "border-l-blue-500"
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mr-2 ${
                          listing.type === "sell" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {listing.type === "sell" ? "For Sale" : "Wanted"}
                        </span>
                        <CardTitle className="text-xl mt-1">{listing.breed} - {listing.age} - {listing.gender}</CardTitle>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{listing.price}</p>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                 
                  <CardContent>
                  {listing.type === "sell" && listing.image && (
                       <div className="mb-4">
                            <img 
                              src={listing.image} 
                              alt={listing.breed} 
                              className="w-full h-48 object-cover rounded-md" 
                            />
                          </div>
                        )}
                    
                    <p className="text-gray-700">{listing.description}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="font-medium"> <b>Contact Name: </b>{listing.contact_name}</p>
                      <p className="font-medium"><b>Contact Number: </b>{listing.contact_number}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <span className="text-sm text-gray-500"><b>Posted: </b>{new Date(listing.date).toLocaleDateString()}</span>
                    <Button 
                      variant="outline" 
                      className="text-green-700 border-green-700 hover:bg-green-50"
                      onClick={() => viewListingDetails(listing)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No listings match your search criteria.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="sell" className="mt-0">
          <div className="space-y-6">
            {filteredSellListings.length > 0 ? (
              filteredSellListings.map((listing) => (
                <Card key={listing.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded mr-2 bg-green-100 text-green-800">
                          For Sale
                        </span>
                        <CardTitle className="text-xl mt-1">{listing.breed} - {listing.age} - {listing.gender}</CardTitle>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{listing.price}</p>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                  {listing.type === "sell" && listing.image && (
                       <div className="mb-4">
                            <img 
                              src={listing.image} 
                              alt={listing.breed} 
                              className="w-full h-48 object-cover rounded-md" 
                            />
                          </div>
                        )}
  
                    <p className="text-gray-700">{listing.description}</p>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="font-medium">Contact: {listing.contact_name}</p>
                      <p className="font-medium">Contact Number: {listing.contact_number}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    {/* <span className="text-sm text-gray-500">Posted hii: {listing.postedDate}</span> */}
                    <Button 
                      variant="outline" 
                      className="text-green-700 border-green-700 hover:bg-green-50"
                      onClick={() => viewListingDetails(listing)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No sale listings match your search criteria.</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="buy" className="mt-0">
          <div className="space-y-6">
            {filteredBuyListings.length > 0 ? (
              filteredBuyListings.map((listing) => (
                <Card key={listing.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded mr-2 bg-blue-100 text-blue-800">
                          Wanted
                        </span>
                        <CardTitle className="text-xl mt-1">{listing.breed} - {listing.age} - {listing.gender}</CardTitle>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{listing.price}</p>
                        <p className="text-sm text-gray-500">{listing.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                  {listing.type === "sell" && listing.image && (
                       <div className="mb-4">
                            <img 
                              src={listing.image} 
                              alt={listing.breed} 
                              className="w-full h-48 object-cover rounded-md" 
                            />
                          </div>
                        )}
                    {/* <p className="text-gray-700">{listing.description}</p> */}
                    {/* <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="font-medium">Contact name: {listing.contact_name}</p>
                      <p className="font-medium">Contact: {listing.contact}</p>
                    </div> */}
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    {/* <span className="text-sm text-gray-500">Posted jbj: {listing.postedDate}</span> */}
                    <Button 
                      variant="outline" 
                      className="text-green-700 border-green-700 hover:bg-green-50"
                      onClick={() => viewListingDetails(listing)}
                    >
                      View Details 
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No buy listings match your search criteria.</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedListing && (
        <ListingDetail 
          listing={selectedListing} 
          open={detailDialogOpen} 
          onClose={() => setDetailDialogOpen(false)} 
        />
      )}
    </div>
  );
};

export default BuySellCattle;
