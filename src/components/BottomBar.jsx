import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, Car, Palmtree } from "lucide-react";

export default function ModernBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Map routes to navigation values
  const routeMap = {
    "/holidays": 0,
    "/": 1,
    "/cabs": 2,
    "/profile": 3,
  };

  // Sync active state with the current URL
  useEffect(() => {
    const currentPath = location.pathname;
    const correspondingValue = routeMap[currentPath];
    if (correspondingValue !== undefined) {
      setValue(correspondingValue);
    }
  }, [location.pathname]);

  // Hide navigation on login/register pages
  if (location.pathname === "/login" || location.pathname.includes("/register") || location.pathname === "/hotel-search") {
    return null;
  }

  const handleNavigation = (path, index) => {
    setValue(index);
    navigate(path);
  };

  const navItems = [
    { label: "Holidays", icon: Palmtree, path: "/holidays" },
    { label: "Home", icon: Home, path: "/" },
    { label: "Cabs", icon: Car, path: "/cabs" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  if (isSmallScreen) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white/75 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-gray-200/50">
          <div className="flex items-center justify-around px-2 py-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = value === index;
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path, index)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive ? "scale-110" : "scale-100"
                    }`} 
                  />
                  <span 
                    className={`text-xs transition-all duration-300 ${
                      isActive ? "font-bold" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null; // Don't render anything on larger screens
}