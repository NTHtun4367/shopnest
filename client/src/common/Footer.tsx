import { AtSign, Facebook, Instagram, Twitter } from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiAppstore } from "react-icons/si";
import { Link } from "react-router"

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-12 mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-3xl font-bold italic text-white mb-4">
            SHOPNEST
          </h3>
          <p className="text-sm leading-6 mb-6">
            Elevate your lifestyle with our premium collection of essentials and
            activewear.
          </p>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Navigation Columns */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products/filter" className="hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/products/filter" className="hover:text-white">
                Best Deals
              </Link>
            </li>
            <li>
              <Link to="/products/filter" className="hover:text-white">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* App Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs">
            Get the App
          </h4>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors">
              <IoLogoGooglePlaystore size={24} className="text-white" />
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">Get it on</p>
                <p className="text-sm font-semibold leading-none mt-1 text-white">
                  Google Play
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors">
              <SiAppstore size={24} className="text-white" />
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">
                  Download on the
                </p>
                <p className="text-sm font-semibold leading-none mt-1 text-white">
                  App Store
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="flex items-center gap-1">
          <AtSign className="w-3 h-3" />
          2026 SHOPNEST. All Rights Reserved.
        </p>
        <div className="flex gap-6 uppercase tracking-tighter">
          <Link to="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
