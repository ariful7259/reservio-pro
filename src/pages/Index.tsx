
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import TutorialGuide from '@/components/onboarding/TutorialGuide';

// Correct import statements for the components
import ExploreSection from '@/components/ExploreSection';
import ServiceCard from '@/components/ServiceCard';
import DigitalProductsShowcase from '@/components/DigitalProductsShowcase';
import FeaturedDigitalProducts from '@/components/FeaturedDigitalProducts';
import RentalBookingCalendar from '@/components/rental/RentalBookingCalendar';
import RentalReturnSystem from '@/components/rental/RentalReturnSystem';

// Continue with the rest of the Index component
const Index = () => {
  const navigate = useNavigate();
  const { language, hasCompletedOnboarding } = useApp();
  const [showTutorial, setShowTutorial] = useState(!hasCompletedOnboarding);
  const [activeTab, setActiveTab] = useState('services'); // Add this state for tab control
  
  // Sample data for demonstration
  const featuredServices = [
    {
      id: "1",
      title: language === 'bn' ? "ডাক্তার অ্যাপয়েন্টমেন্ট" : "Doctor Appointment",
      description: language === 'bn' ? "বিশেষজ্ঞ ডাক্তারদের সাথে অ্যাপয়েন্টমেন্ট বুক করুন" : "Book appointments with specialist doctors",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      price: "৳৮০০",
      rating: 4.8,
      location: language === 'bn' ? "ঢাকা" : "Dhaka"
    },
    {
      id: "2",
      title: language === 'bn' ? "ইলেকট্রিশিয়ান" : "Electrician",
      description: language === 'bn' ? "অভিজ্ঞ ইলেকট্রিশিয়ান দ্বারা ইলেকট্রিক্যাল সমস্যা সমাধান" : "Electrical problems solved by experienced electricians",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      price: "৳৫০০",
      rating: 4.7,
      location: language === 'bn' ? "ঢাকা" : "Dhaka"
    },
    {
      id: "3",
      title: language === 'bn' ? "হোম ক্লিনিং" : "Home Cleaning",
      description: language === 'bn' ? "পেশাদার ক্লিনার দ্বারা সম্পূর্ণ বাড়ি পরিষ্কার" : "Complete house cleaning by professional cleaners",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "৳১,৮০০",
      rating: 4.9,
      location: language === 'bn' ? "ঢাকা" : "Dhaka"
    },
    {
      id: "4",
      title: language === 'bn' ? "ল্যাপটপ মেরামত" : "Laptop Repair",
      description: language === 'bn' ? "সব ধরনের ল্যাপটপ মেরামত ও সার্ভিসিং" : "All types of laptop repair and servicing",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "৳৮০০+",
      rating: 4.6,
      location: language === 'bn' ? "ঢাকা" : "Dhaka"
    },
  ];

  useEffect(() => {
    // Show tutorial for new users
    if (!hasCompletedOnboarding) {
      setShowTutorial(true);
    }
  }, [hasCompletedOnboarding]);
  
  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="pb-20">
      {/* Navbar and breadcrumb are now handled in App.tsx */}
      
      {/* Show tutorial guide for new users */}
      {showTutorial && <TutorialGuide />}
      
      {/* ExploreSection with fixed icon rendering */}
      <ExploreSection />
      
      {/* Digital Products Showcase */}
      <div className="container mx-auto px-4">
        <DigitalProductsShowcase />
      </div>
      
      {/* Featured Digital Products */}
      <div className="container mx-auto px-4">
        <FeaturedDigitalProducts />
      </div>
      
      {/* Tab navigation for services and rental features */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b mb-6">
          <button
            className={`pb-2 px-4 ${activeTab === 'services' 
              ? 'border-b-2 border-primary font-medium text-primary' 
              : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('services')}
          >
            {language === 'bn' ? "জনপ্রিয় সেবাসমূহ" : "Popular Services"}
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === 'rental-booking' 
              ? 'border-b-2 border-primary font-medium text-primary' 
              : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('rental-booking')}
          >
            {language === 'bn' ? "রেন্টাল বুকিং সিস্টেম" : "Rental Booking System"}
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === 'rental-return' 
              ? 'border-b-2 border-primary font-medium text-primary' 
              : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('rental-return')}
          >
            {language === 'bn' ? "রেন্টাল রিটার্ন সিস্টেম" : "Rental Return System"}
          </button>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map(service => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                price={service.price}
                rating={service.rating}
                location={service.location}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
        )}
        
        {activeTab === 'rental-booking' && (
          <div className="bg-slate-50 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
              {language === 'bn' ? "ক্যালেন্ডার-ভিত্তিক রেন্টাল বুকিং" : "Calendar-based Rental Booking"}
            </h2>
            <RentalBookingCalendar />
          </div>
        )}
        
        {activeTab === 'rental-return' && (
          <div className="bg-slate-50 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
              {language === 'bn' ? "রেন্টাল রিটার্ন ম্যানেজমেন্ট" : "Rental Return Management"}
            </h2>
            <RentalReturnSystem />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
