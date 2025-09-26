import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  autoUpdate
} from '@floating-ui/react';
import {
  MenuIcon, CloseIcon, PhoneIcon, CabIcon, HolidayIcon,
  PropertyIcon, PartnerIcon, ProfileIcon, BookingIcon,
  CouponIcon, LogoutIcon, UserCircleIcon
} from './Icons';

const Logo = () => (
  <img src="/logo.png" alt="HRS" className="w-18 h-12" />
);

// --- Component-level Constants ---
// Moved outside the component to prevent re-declaration on every render.
const navLinks = [
  { text: "Cabs", path: "/cabs", icon: <CabIcon /> },
  { text: "Holidays", path: "/holidays", icon: <HolidayIcon /> },
  { text: "List Property", path: "/partner", icon: <PropertyIcon /> },
  { text: "Travel Partner", path: "/travel-partner", icon: <PartnerIcon /> },
];

const profileLinks = [
  { text: "Profile", path: "/profile", icon: <ProfileIcon /> },
  { text: "Bookings", path: "/bookings", icon: <BookingIcon /> },
  { text: "Coupons", path: "/coupons", icon: <CouponIcon /> },
  { text: "Logout", path: "/login", icon: <LogoutIcon /> },
];

const contactLink = { text: "Call us for booking", number: "9917991758", path: "tel:9917991758" };

// --- Sub-components ---
// Moved outside the main component to prevent re-creation on every render.
const NavLink = ({ link, handleRedirect }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(link.path);

  return (
    <button
      onClick={() => handleRedirect(link.path)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
          ? "bg-white/20 text-gray-900 shadow-sm backdrop-blur-sm border border-white/20"
          : "text-gray-600 hover:bg-white/15 hover:text-gray-900 hover:backdrop-blur-sm"
        }`}
    >
      {link.icon}
      {link.text}
    </button>
  );
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Floating UI hooks for profile dropdown
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: profileMenuOpen,
    onOpenChange: setProfileMenuOpen,
    middleware: [offset(10), flip()],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [mobileMenuOpen]);

  const handleRedirect = (path) => {
    if (path.startsWith('tel:')) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };
  if (location.pathname === "/login" || location.pathname === "/register") return null;

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 ">
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ease-out transform ${headerScrolled
              ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl" // Scrolled state styles
              : "bg-white/50 backdrop-blur-lg border border-white/30 shadow-lg rounded-2xl" // Initial state styles
            }`}
        >
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleRedirect("/")}
                className="flex-shrink-0 flex items-center gap-3 hover:scale-105 transition-transform duration-200"
              >
                <Logo />
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.text} link={link} handleRedirect={handleRedirect} />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleRedirect(contactLink.path)}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm border border-white/10"
              >
                <PhoneIcon />
                <span>{contactLink.number}</span>
              </button>

              <div className="relative hidden lg:block">
                <button
                  ref={refs.setReference}
                  {...getReferenceProps()}
                  className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  <UserCircleIcon />
                </button>
                {profileMenuOpen && (
                  <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    style={floatingStyles} // floatingStyles must be applied for positioning
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200/80"
                  >
                    {profileLinks.map((link) => (
                      <button
                        key={link.text}
                        onClick={() => handleRedirect(link.path)}
                        className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm transition-all duration-200 ${link.text === 'Logout'
                            ? 'text-red-500 hover:bg-red-500/10'
                            : 'text-gray-700 hover:bg-white/10'
                          }`}
                      >
                        {link.icon}
                        <span>{link.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-white/15 focus:outline-none transition-all duration-200 hover:scale-105 backdrop-blur-sm"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add top padding to body content to account for floating header */}
      <div className="pt-24"></div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white/70 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-in-out z-50 border-r border-white/30 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <button onClick={() => handleRedirect("/")} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <Logo />
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl hover:bg-white/15 text-gray-500 transition-all duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.text}>
                <button
                  onClick={() => handleRedirect(link.path)}
                  className={`flex items-center gap-4 p-3 rounded-xl w-full text-left font-medium transition-all duration-200 ${location.pathname.startsWith(link.path)
                      ? "bg-white/20 text-gray-900 shadow-sm backdrop-blur-sm border border-white/10"
                      : "text-gray-600 hover:bg-white/15 hover:backdrop-blur-sm"
                    }`}
                >
                  <span className="text-gray-800">{link.icon}</span>
                  <span>{link.text}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/20">
            <ul className="space-y-2">
              {profileLinks.map((link) => (
                <li key={link.text}>
                  <button
                    onClick={() => handleRedirect(link.path)}
                    className={`flex items-center gap-4 p-3 rounded-xl w-full text-left font-medium transition-all duration-200 ${location.pathname.startsWith(link.path) ? "bg-white/20 shadow-sm backdrop-blur-sm border border-white/10" : ""
                      } ${link.text === 'Logout'
                        ? 'text-red-500 hover:bg-red-500/10'
                        : 'text-gray-600 hover:bg-white/15'
                      }`}
                  >
                    <span className={link.text === 'Logout' ? 'text-red-500' : 'text-gray-800'}>{link.icon}</span>
                    <span>{link.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <button
              onClick={() => handleRedirect(contactLink.path)}
              className="flex items-center gap-3 p-3 rounded-xl w-full text-left text-gray-600 hover:bg-white/15 transition-all duration-200"
            >
              <div className="p-2 bg-white/20 rounded-xl text-gray-800 backdrop-blur-sm">
                <PhoneIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">{contactLink.text}</span>
                <span className="text-base font-semibold text-gray-900">
                  {contactLink.number}
                </span>
              </div>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
