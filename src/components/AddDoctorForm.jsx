import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  specialty: z.string().min(2, { message: "Specialization is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  phone: z.string().min(10, { message: "Valid contact number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  about: z.string().min(10, { message: "About must be at least 10 characters" })
});

const AddDoctorForm = ({ doctor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctors = location.state?.doctor;
  const resourceId = location.state?._id || location.state?.resourceId;
  console.log(resourceId)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: doctors || {
      name: "",
      specialty: "",
      experience: "",
      location: "",
      phone: "",
      email: "",
      about: "",
    },
  });


  const onSubmit = async (values) => {
    console.log(values);
    let response
    if (doctors) {
      // Update existing doctor
      console.log("in put")
      response = await axios.put(`http://localhost:4000/doctor/updateDoctor/${resourceId}`, values, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Doctor information updated",
          description: "The doctor information has been saved successfully.",
        });
      }
      navigate("/admin/manage-doctors");
    } else{
      console.log("in add")
    try {
      const response = await axios.put("http://localhost:4000/doctor/addDoctor", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Doctor information submitted",
          description: "The doctor information has been saved successfully.",
        });
        form.reset();
       
      } else {
        throw new Error("Failed to update doctor information.");
      }
    } catch (error) {
      console.error("Error updating doctor information:", error);
      toast({
        title: "Submission Failed",
        description: "There was an issue saving the doctor information.",
        variant: "destructive",
      });
    }
    toast({
      title: "Doctor information submitted",
      description: "The doctor information has been saved successfully.",
    });
    navigate(`/admin/manage-doctors`)
    form.reset();
  }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800">Add New Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General Veterinary">General Veterinary</SelectItem>
                        <SelectItem value="Livestock Specialist">Livestock Specialist</SelectItem>
                        <SelectItem value="Dairy Health Expert">Dairy Health Expert</SelectItem>
                        <SelectItem value="Bovine Reproduction">Bovine Reproduction</SelectItem>
                        <SelectItem value="Animal Nutrition">Animal Nutrition</SelectItem>
                        <SelectItem value="Veterinary Surgery">Veterinary Surgery</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (years)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 5 years" {...field} />
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
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="doctor@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the doctor's expertise and services..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
              <Button type="submit" className="bg-green-700 hover:bg-green-800" >Add Doctor</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddDoctorForm;
