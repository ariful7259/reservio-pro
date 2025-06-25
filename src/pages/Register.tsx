
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "পাসওয়ার্ড মিল নেই",
        description: "পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড একই হতে হবে",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await signup(name, email, password);
      toast({
        title: "নিবন্ধন সফল",
        description: "আপনার অ্যাকাউন্ট তৈরি হয়েছে",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "নিবন্ধন ব্যর্থ",
        description: "অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">নিবন্ধন করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'নিবন্ধন হচ্ছে...' : 'নিবন্ধন করুন'}
            </Button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              লগইন করুন
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
