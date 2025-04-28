
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "পাসওয়ার্ড মিলছে না",
        description: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "নিবন্ধন সফল হয়েছে!",
        description: "আপনার অ্যাকাউন্ট তৈরি করা হয়েছে",
      });
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="container px-4 py-20">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">নতুন অ্যাকাউন্ট তৈরি করুন</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">নাম</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">ইমেইল</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">মোবাইল নম্বর</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="পাসওয়ার্ড লিখুন"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'প্রক্রিয়া চলছে...' : 'নিবন্ধন করুন'}
                </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center text-sm">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link to="/login" className="text-primary underline underline-offset-4">
                লগইন করুন
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
