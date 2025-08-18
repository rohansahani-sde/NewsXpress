import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
    {/* <div className="h-0.5 bg-gray-500"></div> */}
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm leading-6">
            We bring you the latest and most reliable news from around the world.
            Stay informed with breaking news, politics, technology, sports and more.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/news/politics" className="hover:text-white">Politics</a></li>
            <li><a href="/news/technology" className="hover:text-white">Technology</a></li>
            <li><a href="/news/health" className="hover:text-white">Health</a></li>
            <li><a href="/news/business" className="hover:text-white">Business</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li> <Link to="/" className="hover:text-white">Home</Link> </li>
            <li> <Link to="/about" className="hover:text-white">About</Link></li>
            <li> <Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li> <Link to="/" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">📍 Vadodara, India</p>
          <p className="text-sm">📧 sahanirohan313@gmail.com</p>
          <p className="text-sm">📞 +91 9793091350</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/rohan-sahani-09-/" target="_blank" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="https://github.com/rohansahani-sde/" target="_blank" className="hover:text-white"><Github size={20} /></a>
            <a href="https://x.com/9793_rohan" target="_blank" className="hover:text-white"><Twitter size={20} /></a>
            <a href="https://github.com/rohansahani-sde/" className="hover:text-white"><Instagram size={20} /></a>
            {/* <a href="#" className="hover:text-white"><Youtube size={20} /></a> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} NewsExpress. All Rights Reserved.
      </div>
    </footer>
    </>
  );
}
