import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hotelList } from '../utils/extrasList'; // Assuming this is a local utility file

// SVG Icon Components for better reusability
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.18a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
);
const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
);
const YouTubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
);
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
);


export default function Footer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navigateTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onHotelClick = (name) => {
    const last = encodeURIComponent(name.trim().split(' ').pop());
    navigate(`/search?search=${last}`);
    closeModal();
  };

  const company = [
    ['About Us', '/about'], ['Contact', '/contact'], ['Careers', '/careers'], ['Partner', '/partner'],
  ];
  const legal = [
    ['Privacy Policy', '/privacy'], ['Terms', '/terms'], ['Cookies', '/cookies'],
  ];
  const social = [
    { icon: <FacebookIcon />, href: '#' }, { icon: <InstagramIcon />, href: '#' }, { icon: <TwitterIcon />, href: '#' }, { icon: <YouTubeIcon />, href: '#' },
  ];

  if (location.pathname === "/login" || location.pathname.includes('/register')) return null;

  return (
    <footer className="bg-gray-900 text-gray-400 pt-8 md:pt-12 pb-4 md:pb-8 rounded-t-2xl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-12 gap-8">
          {/* Brand & Social */}
          <div className="col-span-12 md:col-span-4 flex flex-col h-full">
            <div className="mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 invert"/>
              
            </div>
              <a 
    href="https://avverma.s3.ap-south-1.amazonaws.com/hrs.hotelroomsstay.apk"
    className="mb-4 mt-2 w-max"
    download
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-xs hover:bg-green-700 transition"
      type="button"
    >
      Download APK
    </button>
  </a>
            <p className="text-sm mb-6 max-w-xs">
              Your one-stop site to find and book perfect stays worldwide.
            </p>
            <h3 className="text-gray-200 font-semibold mb-2">Follow Us</h3>
            <div className="flex items-center gap-2">
              {social.map((item, i) => (
                <a key={i} href={item.href} className="text-gray-400 p-2 rounded-full hover:text-white hover:bg-white/10 transition-colors">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Company Links */}
              <div className="flex flex-col items-start">
                <h3 className="text-white text-lg font-semibold mb-2">Company</h3>
                <div className="flex flex-col items-start gap-1">
                  {company.map(([name, path], i) => (
                    <a key={i} href={path} onClick={(e) => { e.preventDefault(); navigateTo(path); }} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Destinations Links */}
              <div className="flex flex-col items-start">
                <h3 className="text-white text-lg font-semibold mb-2">Destinations</h3>
                <div className="flex flex-col items-start gap-1">
                  {hotelList.slice(0, 4).map((h, i) => (
                    <a key={i} href="#" onClick={(e) => { e.preventDefault(); onHotelClick(h.hotel); }} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {h.hotel}
                    </a>
                  ))}
                </div>
                <div className="mt-3 w-full flex">
                  <button type="button" onClick={openModal} className="text-sm font-bold text-pink-500 hover:underline">
                    More Locations
                  </button>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col items-start">
                <h3 className="text-white text-lg font-semibold mb-2">Legal</h3>
                <div className="flex flex-col items-start gap-1">
                  {legal.map(([name, path], i) => (
                    <a key={i} href={path} onClick={(e) => { e.preventDefault(); navigateTo(path); }} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} RoomsStay Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2">
            <a href="#" className="inline-block">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8"/>
            </a>
            <a href="#" className="inline-block">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8"/>
            </a>
          </div>
        </div>
      </div>

      {/* Modal for All Destinations */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div onClick={closeModal} className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Modal Content */}
          <div className={`relative bg-white rounded-lg shadow-xl w-11/12 sm:w-3/4 md:w-auto md:max-w-2xl max-h-[85vh] transition-all duration-300 ease-in-out ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-800">All Destinations</h2>
                    <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-200">
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {hotelList.map((h, i) => (
                    <button key={i} onClick={() => onHotelClick(h.hotel)} className="w-full text-center text-sm font-medium text-gray-700 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors">
                    {h.hotel}
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
