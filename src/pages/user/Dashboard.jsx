import { createCattleListing } from "./listings";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Heart, Video, Book, AlertCircle, ShoppingCart, Briefcase, 
  ArrowRight, Bell, Calendar, ChevronRight, MessageSquare
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios"
import ListingDetail from "@/components/ListingDetail";
import {Trash2,Edit,PlusCircle,Upload,X} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const navigate = useNavigate()
  const [cattleListings, setCattleListings] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [cattle, setCattle] = useState([]);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const viewListingDetails = (animal) => {
    setSelectedListing(animal);
    setDetailDialogOpen(true);
  };

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

  const updateListing = async (id, data) => {
    try {
      console.log("hiiiii")
      console.log(id)
      console.log(data)
      const res = await axios.put(`http://localhost:4000/buysell/updateCattle/${id}`, data);
      console.log(res.data);
      toast({ title: "Cattle Updated", description: "The cattle has been updated." });
      navigate(`/user`)
      fetchcattle1();
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };
  useEffect(()=>{
    const fetchcattle = async() =>{
      try{
        const user = JSON.parse(localStorage.getItem("user"));
         const userId = user?.id;
        const response = await axios.get(`http://localhost:4000/buysell/getspecific?userId=${userId}`)
        setCattle(response.data);
      }catch(error){
        console.log("Error fetching catlle data: ",error);
      }
    }
    fetchcattle();
  }, []);

  const fetchcattle1 = async() =>{
    try{
      const user = JSON.parse(localStorage.getItem("user"));
       const userId = user?.id;
      const response = await axios.get(`http://localhost:4000/buysell/getspecific?userId=${userId}`)
      setCattle(response.data);
    }catch(error){
      console.log("Error fetching catlle data: ",error);
    }
  }
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
  const quickLinks = [
    { name: "Find Vets", path: "/user/search-doctors", icon: <Search className="h-5 w-5 text-forest-600" /> },
    { name: "Healthcare Tips", path: "/user/common-healthcare", icon: <Heart className="h-5 w-5 text-forest-600" /> },
    { name: "Video Tutorials", path: "/user/videos", icon: <Video className="h-5 w-5 text-forest-600" /> },
    { name: "Articles", path: "/user/articles", icon: <Book className="h-5 w-5 text-forest-600" /> },
    { name: "A-Z Disease Info", path: "/user/symptoms", icon: <AlertCircle className="h-5 w-5 text-forest-600" /> },
    { name: "Buy & Sell", path: "/user/buy-sell", icon: <ShoppingCart className="h-5 w-5 text-forest-600" /> },
    { name: "Insurance", path: "/user/insurance", icon: <Briefcase className="h-5 w-5 text-forest-600" /> }
  ];
  const handleDelete = async (cattleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:4000/buysell/deleteCattle/${cattleId}`);
      if (response.status === 200) {
        toast({ title: "Cattle Deleted", description: "The cattle record has been removed." });
        fetchcattle1();
      } else {
        throw new Error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({ title: "Delete Failed", description: "Could not delete doctor.", variant: "destructive" });
    }
  };

  const handleEdit = (animal) => {
    setSelectedListing(animal); // Save current animal for editing
    form.reset({
      breed: animal.breed,
      age: animal.age?.toString() || '', // from database int type
      type: animal.type,
      gender: animal.gender,
      price: animal.price?.toString() || '',
      location: animal.location,
      description: animal.description,
      contact_name: animal.contact_name,
      contact_number: animal.contact_number,
      // Add others if needed
    });
    setImagePreview(animal.image)
    setUploadedImages(animal.images || []); // If you're storing image URLs
    setOpen(true); // Open the dialog
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
        resourceId: data.resourceId || data._id,
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
      // const response = await createCattleListing(listingData);
      
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
  
      // setCattleListings([newListing, ...cattleListings]);
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name || "Farmer"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your livestock and resources to keep them healthy.
        </p>
      </div>
      
      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-forest-300 hover:shadow transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mb-3">
                {link.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{link.name}</span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* My Cattle */}
      <section>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cattle.map((animal) => (
            <Card key={animal.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{animal.breed}</h3>
                  <p className="text-sm text-gray-500">
                    {animal.type} | {animal.breed}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    animal.status === "Healthy"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {animal.status}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-700">
                <p>Age: {animal.age}</p>
                <p>Price: {animal.price}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <CardFooter className="pt-0 flex justify-between">
                    <Button 
                      variant="outline" 
                      className="text-green-700 border-green-700 hover:bg-green-50"
                      onClick={() => viewListingDetails(animal)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                  <CardFooter className="pt-0 flex justify-between">
                  <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(animal._id || animal.resourceId)} // Pass doctorId dynamically
                        >
                          <Trash2 className="h-4 w-4" />
                  </Button>
                  </CardFooter>
                  {/* <CardFooter>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(animal)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                  </CardFooter> */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
              <CardFooter>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(animal)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                  </CardFooter>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Sell Your Cattle</DialogTitle>
              <DialogDescription>
                Fill in the details about the cattle you want to sell. Be sure to provide accurate information.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form className="space-y-6 pt-4" onSubmit={form.handleSubmit(async (formData) => {
    // Combine form data with image URLs
    const updateData = {
      ...formData,
      image: uploadedImages[0] || '', // First image as main image
      additional_images: uploadedImages.slice(1) || [] // Remaining as additional
    };
    
    try {
      await updateListing(animal._id, updateData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  })}>
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
                    // onClick={()=> updateListing(animal._id,field)}
                    onClick={()=> navigate(`/user`)}
                  >
                   
                    {uploading ? "Uploading..." : "Update Listing"}
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
            </Card>
          ))}
{selectedListing && (
  <ListingDetail 
    listing={selectedListing} 
    open={detailDialogOpen} 
    onClose={() => setDetailDialogOpen(false)} 
  />
)}

        </div>
      </section>
      </div>
    );
};

export default Dashboard;
     