
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home as HomeIcon, 
  ShoppingBag, 
  Wrench, 
  ArrowRight,
  Star,
  Users,
  MapPin
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const featuredServices = [
    {
      id: 1,
      title: 'বাসা ভাড়া',
      description: 'আপনার পছন্দের বাসা খুঁজে নিন',
      icon: <HomeIcon className="h-8 w-8 text-blue-500" />,
      path: '/rentals',
      color: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'মার্কেটপ্লেস',
      description: 'প্রয়োজনীয় পণ্য কিনুন বা বিক্রি করুন',
      icon: <ShoppingBag className="h-8 w-8 text-green-500" />,
      path: '/marketplace',
      color: 'bg-green-50'
    },
    {
      id: 3,
      title: 'সেবা',
      description: 'বিভিন্ন পেশাদার সেবা নিন',
      icon: <Wrench className="h-8 w-8 text-purple-500" />,
      path: '/services',
      color: 'bg-purple-50'
    }
  ];

  const stats = [
    { label: 'সক্রিয় ব্যবহারকারী', value: '১০,০০০+', icon: <Users className="h-5 w-5" /> },
    { label: 'পোস্ট', value: '৫,০০০+', icon: <HomeIcon className="h-5 w-5" /> },
    { label: 'শহর', value: '৫০+', icon: <MapPin className="h-5 w-5" /> },
    { label: 'রেটিং', value: '৪.৮', icon: <Star className="h-5 w-5" /> }
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">স্বাগতম</h1>
        <p className="text-xl text-muted-foreground mb-8">
          আপনার প্রয়োজনীয় সেবা খুঁজে নিন এবং নিরাপদে লেনদেন করুন
        </p>
      </div>

      {/* Featured Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {featuredServices.map((service) => (
          <Card 
            key={service.id} 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate(service.path)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Button variant="outline" className="group">
                এখনই দেখুন
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">আজই শুরু করুন</h2>
        <p className="text-muted-foreground mb-6">
          আমাদের প্ল্যাটফর্মে যোগ দিন এবং আপনার প্রয়োজনীয় সেবা পান
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/rentals')}>
            বাসা খুঁজুন
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/services')}>
            সেবা নিন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
