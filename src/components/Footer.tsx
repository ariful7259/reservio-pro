
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">আমাদের প্ল্যাটফর্ম</h3>
            <p className="text-gray-400 mb-4">
              বাংলাদেশের সবচেয়ে বড় মাল্টি-সার্ভিস প্ল্যাটফর্ম
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-blue-500" />
              <Twitter className="h-5 w-5 text-blue-400" />
              <Instagram className="h-5 w-5 text-pink-500" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-gray-400 hover:text-white">মার্কেটপ্লেস</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">সেবা</Link></li>
              <li><Link to="/rentals" className="text-gray-400 hover:text-white">ভাড়া</Link></li>
              <li><Link to="/housing" className="text-gray-400 hover:text-white">বাসা-বাড়ি</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">সাহায্য</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white">সাহায্য কেন্দ্র</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">যোগাযোগ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">গোপনীয়তা নীতি</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">শর্তাবলী</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-gray-400">+880 1700 000000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-gray-400">info@platform.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-gray-400">ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 আমাদের প্ল্যাটফর্ম. সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
