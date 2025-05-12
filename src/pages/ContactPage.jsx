
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-forest-500" />,
      title: "Phone",
      details: ["+91 9876 543 210", "+91 1234 567 890"],
      action: "tel:+919876543210"
    },
    {
      icon: <Mail className="h-6 w-6 text-forest-500" />,
      title: "Email",
      details: ["info@bovbridge.com", "support@bovbridge.com"],
      action: "mailto:info@bovbridge.com"
    },
    {
      icon: <MapPin className="h-6 w-6 text-forest-500" />,
      title: "Office",
      details: ["123 Agricultural Zone,", "New Delhi, India - 110001"],
      action: "#map"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-earth-900 font-serif">Contact Us</h1>
            <p className="mt-4 text-xl text-earth-700 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you with all your cattle healthcare needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-earth-50 rounded-lg p-8 text-center shadow-md border border-earth-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-forest-100 text-forest-700 rounded-full mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-earth-700">{detail}</p>
                ))}
                <a 
                  href={info.action} 
                  className="mt-4 inline-block text-forest-600 hover:text-forest-700 font-medium"
                >
                  Connect
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-earth-900 font-serif mb-6">Send us a message</h2>
              <p className="text-lg text-earth-700 mb-8">
                Whether you have a question about our services, need technical support, or want to provide feedback, our team is ready to assist you.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-earth-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-earth-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-earth-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-earth-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-500"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  className="bg-forest-600 hover:bg-forest-700 text-white px-6 py-3 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
            
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl h-full min-h-[400px]" id="map">
                {/* This would be replaced with an actual Google Map in production */}
                <div className="bg-gray-200 h-full flex items-center justify-center p-10 text-center">
                  <div>
                    <MapPin className="h-12 w-12 text-forest-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">BovBridge Headquarters</h3>
                    <p className="text-gray-600">
                      123 Agricultural Zone, New Delhi, India - 110001
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      [Map integration would be implemented here with Google Maps API]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              Answers to common questions about our platform and services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-earth-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-earth-800 mb-2">How do I find a veterinarian on BovBridge?</h3>
                <p className="text-earth-700">
                  After registering as a farmer, you can use our "Find Vets" feature to search for veterinarians in your area. You can filter by location, specialization, and availability.
                </p>
              </div>
              
              <div className="bg-earth-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-earth-800 mb-2">Is BovBridge available in my region?</h3>
                <p className="text-earth-700">
                  BovBridge is currently available across major states in India. We're continuously expanding our network to reach more rural areas.
                </p>
              </div>
              
              <div className="bg-earth-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-earth-800 mb-2">How can I become a veterinary partner?</h3>
                <p className="text-earth-700">
                  Qualified veterinarians can apply to join our network by contacting our team. We'll verify your credentials and help you set up your profile.
                </p>
              </div>
              
              <div className="bg-earth-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-earth-800 mb-2">Are the home remedies on BovBridge scientifically verified?</h3>
                <p className="text-earth-700">
                  Yes, all our home remedies and treatment suggestions are reviewed by qualified veterinarians before being published on the platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
