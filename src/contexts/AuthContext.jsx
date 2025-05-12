
import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Sign in function
  const login = (email, password, userType = 'farmer') => {
    // Check if we have registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Look for a matching user in our registered users
    const matchedUser = registeredUsers.find(user => 
      user.email === email && user.password === password
    );
    
    if (matchedUser) {
      // Use the matched user's data
      const user = { 
        ...matchedUser,
        userType: matchedUser.userType || userType // Use stored userType or default
      };
      
      // Remove password from what we store in current session
      delete user.password;
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      return user;
    } else if (email && password) {
      // Fallback to mock users if no registered user found (for demo)
      const mockUsers = {
        farmer: { id: '123', name: 'Farmer Singh', email, userType: 'farmer' },
        admin: { id: 'admin1', name: 'Admin User', email, userType: 'admin' }
      };
      
      const user = mockUsers[userType];
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      return user;
    }
    
    throw new Error('Invalid credentials');
  };

  // register function
  const register = async (name, email, password, additionalData = {}) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        ...additionalData, // Pass any extra data like phone, location, etc.
      });
  
      const user = response.data; // Assuming backend returns user data after registration
  
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
  
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
  
      return user;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
  
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "There was an error during registration.",
        variant: "destructive",
      });
  
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  

  // Sign out function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    currentUser,
    userType: currentUser?.userType,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
