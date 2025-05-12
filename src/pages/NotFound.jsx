
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-earth-800 font-serif">404</h1>
        <div className="h-2 w-16 bg-forest-500 mx-auto my-6"></div>
        <h2 className="text-3xl font-semibold text-earth-800 mb-6">Page Not Found</h2>
        <p className="text-xl text-earth-600 mb-8 max-w-md mx-auto">
          We can't seem to find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <Button 
          asChild
          className="bg-forest-600 hover:bg-forest-700 text-white px-8 py-6 rounded-md shadow-md"
        >
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
