import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderTravel from './TravelLocations';

const Logo = () => (
  <img src="/logo.png" alt="HRS" className="w-18 h-12" />
);

const MenuIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const CabIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 17H3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12zm-3 4H6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zM7 17v-4M17 17v-4M4 11h16" /></svg>;
const HolidayIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 11l-4 2l4 2l4-2l-4-2z" /></svg>;
const PropertyIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const PartnerIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>;
const HomeIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const ProfileIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const BookingIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>;
const CouponIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const UserCircleIcon = () => <svg className="w-6 h-6 text-gray-500 hover:text-gray-900 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

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
  ]

  const contactLink = { text: "Call us for booking", number: "9917991758", path: "tel:9917991758" };

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  const handleRedirect = (path) => {
    // Handle external links or different protocols like 'tel:'
    if (path.startsWith('tel:')) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const NavLink = ({ link }) => {
    const isActive = location.pathname.startsWith(link.path);

    return (
      <button
        onClick={() => handleRedirect(link.path)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
      >
        {link.icon}
        {link.text}
      </button>
    );
  };


  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 transform-gpu ${headerScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/80 shadow-sm"
            : "bg-white border-b border-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex items-center gap-4">
              <button onClick={() => handleRedirect("/")} className="flex-shrink-0 flex items-center gap-3">
                <Logo />
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.text} link={link} />
              ))}
            </nav>

            <div className="flex items-center gap-15">
              <button
                onClick={() => handleRedirect(contactLink.path)}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-md bg-gray-600 text-white text-sm font-semibold hover:bg-gray-800 transition-all duration-200"
              >
                <PhoneIcon />
                <span>{contactLink.number}</span>
              </button>

              <div className="relative hidden lg:block" ref={profileMenuRef}>
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                  <UserCircleIcon />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200/80">
                    {profileLinks.map((link) => (
                      <button
                        key={link.text}
                        onClick={() => handleRedirect(link.path)}
                        className={`flex items-center gap-3 w-full text-left px-4 py-2 text-sm ${link.text === 'Logout' ? 'text-red-500' : 'text-gray-700'} hover:bg-gray-100`}
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
                className="lg:hidden p-2 -mr-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <MenuIcon />
              </button>
            </div>

          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={() => handleRedirect("/")} className="flex items-center gap-3">
            <Logo />
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.text}>
                <button
                  onClick={() => handleRedirect(link.path)}
                  className={`flex items-center gap-4 p-3 rounded-lg w-full text-left font-medium transition-colors duration-200 ${location.pathname.startsWith(link.path)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <span className="text-gray-800">{link.icon}</span>
                  <span>{link.text}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <ul className="space-y-1">
              {profileLinks.map((link) => (
                <li key={link.text}>
                  <button
                    onClick={() => handleRedirect(link.path)}
                    className={`flex items-center gap-4 p-3 rounded-lg w-full text-left font-medium transition-colors duration-200 ${location.pathname.startsWith(link.path) ? "bg-gray-100" : ""
                      } ${link.text === 'Logout' ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <span className={link.text === 'Logout' ? 'text-red-500' : 'text-gray-800'}>{link.icon}</span>
                    <span>{link.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleRedirect(contactLink.path)}
              className="flex items-center gap-3 p-3 rounded-lg w-full text-left text-gray-600 hover:bg-gray-100"
            >
              <div className="p-2 bg-gray-100 rounded-full text-gray-800"><PhoneIcon /></div>
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
