
import { Link } from "react-router-dom";
import { ArrowRight, Search, Phone, PlayCircle, Shield, Award, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "../components/LanguageSwitcher";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Ramesh Singh",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      quote: "PashuSwasth-Doot helped me save my cow when she fell ill suddenly. The vet I found through the platform arrived within hours and provided excellent care."
    },
    {
      name: "Suresh Patel",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
      quote: "The home remedies section is incredibly useful. I've been able to provide initial care to my cattle before the vet arrives, which has made a huge difference."
    },
    {
      name: "Lakshmi Devi",
      location: "Karnataka",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      quote: "I've learned so much from the video tutorials. As a new cattle owner, this platform has been invaluable for my education and the health of my animals."
    }
  ];

  const features = [
    {
      icon: <Search className="h-8 w-8 text-forest-500" />,
      title: "Find Local Veterinarians",
      description: "Connect with qualified veterinarians in your area specializing in bovine health."
    },
    {
      icon: <Phone className="h-8 w-8 text-forest-500" />,
      title: "Direct Consultation",
      description: "Get immediate advice through phone calls or schedule virtual consultations."
    },
    {
      icon: <PlayCircle className="h-8 w-8 text-forest-500" />,
      title: "Educational Videos",
      description: "Learn proper care techniques through our comprehensive video tutorials."
    },
    {
      icon: <Shield className="h-8 w-8 text-forest-500" />,
      title: "Preventive Care",
      description: "Access guidelines on preventing common diseases and maintaining cattle health."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-pattern py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-earth-900 font-serif leading-tight">
                {t("welcomeMessage")}
              </h1>
              <p className="mt-4 text-xl text-earth-700">
                Connecting Farmers with Veterinary Care for Healthier Livestock
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {currentUser ? (
                  <Button 
                    className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-md shadow-md"
                    onClick={() => window.location.href = `/${currentUser.userType}`}
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-md shadow-md"
                      onClick={() => window.location.href = "/register"}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-forest-600 text-forest-600 hover:bg-forest-50 px-8 py-3 rounded-md"
                      onClick={() => window.location.href = "/login"}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&h=400" 
                alt="Healthy Cow" 
                className="rounded-lg shadow-2xl w-full object-cover h-[350px]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">How It Works</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              Our platform simplifies the process of getting proper healthcare for your bovine livestock
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-forest-50 rounded-lg p-8 text-center shadow-md border border-forest-100 transition-transform hover:transform hover:scale-105">
              <div className="bg-forest-100 text-forest-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">Connect</h3>
              <p className="text-earth-600">
                Sign up and connect with veterinarians specializing in bovine healthcare near your location
              </p>
            </div>
            
            <div className="bg-forest-50 rounded-lg p-8 text-center shadow-md border border-forest-100 transition-transform hover:transform hover:scale-105">
              <div className="bg-forest-100 text-forest-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">Consult</h3>
              <p className="text-earth-600">
                Schedule appointments, video calls, or get immediate phone consultations for urgent cases
              </p>
            </div>
            
            <div className="bg-forest-50 rounded-lg p-8 text-center shadow-md border border-forest-100 transition-transform hover:transform hover:scale-105">
              <div className="bg-forest-100 text-forest-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">Care</h3>
              <p className="text-earth-600">
                Get detailed guidance on treating common issues and maintaining optimal health for your animals
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">Features</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              Comprehensive solutions designed specifically for cattle farmers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-earth-800 mb-2">{feature.title}</h3>
                <p className="text-earth-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-3 rounded-md"
              onClick={() => window.location.href = currentUser ? `/${currentUser.userType}` : "/register"}
            >
              Explore All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {/* <section className="py-16 bg-white" id="success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">Success Stories</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              Hear from farmers who have successfully used our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-earth-50 rounded-lg p-8 shadow-md border border-earth-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-earth-800">{testimonial.name}</h4>
                    <p className="text-earth-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-earth-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <section className="py-20 bg-forest-600 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-6">Ready to improve your livestock healthcare?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers who have enhanced the health and productivity of their cattle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-white text-forest-600 hover:bg-gray-100 px-8 py-3 rounded-md shadow-md"
              onClick={() => window.location.href = "/register"}
            >
              Sign Up Now
            </Button>
            {/* <Button 
              variant="outline" 
              className="border-white text-white hover:bg-forest-700 px-8 py-3 rounded-md"
              onClick={() => window.location.href = "/contact"}
            >
              Contact Us
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
