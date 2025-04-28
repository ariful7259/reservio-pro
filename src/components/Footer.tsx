
import React from 'react';
import { Github, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-card-foreground shadow-sm">
      <div className="container px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">আমাদের সম্পর্কে</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">আমাদের পরিচিতি</Link></li>
              <li><Link to="/career" className="hover:underline">ক্যারিয়ার</Link></li>
              <li><Link to="/terms" className="hover:underline">শর্তাবলী</Link></li>
              <li><Link to="/privacy" className="hover:underline">গোপনীয়তা নীতি</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">সেবাসমূহ</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:underline">সমস্ত সেবা</Link></li>
              <li><Link to="/rentals" className="hover:underline">রেন্টাল সেবা</Link></li>
              <li><Link to="/shopping" className="hover:underline">অনলাইন শপিং</Link></li>
              <li><Link to="/wallet" className="hover:underline">ডিজিটাল ওয়ালেট</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">সহায়তা</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:underline">সাধারণ প্রশ্নোত্তর</Link></li>
              <li><Link to="/contact" className="hover:underline">যোগাযোগ করুন</Link></li>
              <li><Link to="/feedback" className="hover:underline">মতামত দিন</Link></li>
              <li><Link to="/report" className="hover:underline">সমস্যা রিপোর্ট</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">যোগাযোগ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@example.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
            
            <div className="flex gap-4 mt-4">
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ইমারজিং টেকনোলজি বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
