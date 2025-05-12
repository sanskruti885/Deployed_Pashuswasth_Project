import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Search, HelpCircle, Heart, Video, BookOpen, AlertCircle, 
  Droplet, ShieldAlert, ShoppingCart, Briefcase, Users, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "./LanguageSwitcher";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ userType }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const farmerLinks = [
    { name: t("dashboard"), path: "/user", icon: <Home size={20} /> },
    { name: t("findVets"), path: "/user/search-doctors", icon: <Search size={20} /> },
    { name: "Popular Questions", path: "/user/popular-questions", icon: <HelpCircle size={20} /> },
    { name: "Common Healthcare", path: "/user/common-healthcare", icon: <Heart size={20} /> },
    { 
      name: "Basic Care", 
      icon: <BookOpen size={20} />,
      submenu: [
        { name: t("videoTutorials"), path: "/user/videos", icon: <Video size={18} /> },
        { name: t("articles"), path: "/user/articles", icon: <BookOpen size={18} /> },
      ]
    },
    { 
      name: "Disease Information", 
      icon: <AlertCircle size={20} />,
      submenu: [
        { name: t("A-Z Disease Info"), path: "/user/symptoms", icon: <AlertCircle size={18} /> },
        { name: t("homeRemedies"), path: "/user/home-remedies", icon: <Droplet size={18} /> },
        { name: "Precautions", path: "/user/precautions", icon: <ShieldAlert size={18} /> },
      ]
    },
    { name: "Buy & Sell Cattle", path: "/user/buy-sell", icon: <ShoppingCart size={20} /> },
    { name: "Insurance", path: "/user/insurance", icon: <Briefcase size={20} /> },
  ];
  
  const adminLinks = [
    // { name: t("dashboard"), path: "/admin", icon: <Home size={20} /> },
    { name: "Manage Doctors", path: "/admin/manage-doctors", icon: <Users size={20} /> },
    { name: "Check Feedback", path: "/admin/feedback", icon: <MessageSquare size={20} /> },
  ];
  
  const links = userType === "admin" ? adminLinks : farmerLinks;
  
  const isActive = (path) => {
    if (path === "/user" || path === "/admin/manage-doctors") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const navigate = useNavigate();  
  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Now inside the component
  };
  const logout = () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
    });
  }
  const isSubmenuActive = (submenu) => {
    return submenu.some(item => isActive(item.path));
  };

  return (
    <aside className="bg-sidebar w-64 border-r border-sidebar-border hidden md:block overflow-y-auto">
      <div className="h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-serif font-bold text-forest-600">PashuSwasth-Doot</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {userType === "admin" ? "Admin Panel" : "Farmer Dashboard"}
          </p>
        </div>
        
        <nav className="mt-2 flex-1">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                {link.submenu ? (
                  <div className="px-3 py-2">
                    <button
                      className={cn(
                        "flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isSubmenuActive(link.submenu) 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                      onClick={() => {
                        const submenuEl = document.getElementById(`submenu-${index}`);
                        if (submenuEl) {
                          submenuEl.classList.toggle("hidden");
                        }
                      }}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                    </button>
                    <ul id={`submenu-${index}`} className={`mt-1 pl-8 space-y-1 ${isSubmenuActive(link.submenu) ? "" : "hidden"}`}>
                      {link.submenu.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={sublink.path}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              isActive(sublink.path) 
                                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                                : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                            )}
                          >
                            <span className="mr-3">{sublink.icon}</span>
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors mx-3",
                      isActive(link.path) 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-6 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
