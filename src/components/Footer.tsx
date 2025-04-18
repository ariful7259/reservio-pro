
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t py-4 mt-auto">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <p className="text-sm text-muted-foreground">© 2025 মার্কেট. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">সাহায্য</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">শর্তাবলী</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">গোপনীয়তা নীতি</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
