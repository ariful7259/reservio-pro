
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const PostAdSection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Announce for accessibility with ARIA live region
  const handlePostAd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate short delay for loader feedback
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "আপনার বিজ্ঞাপন সফলভাবে প্রকাশিত হয়েছে!",
        description: "এখন সবাই দেখতে পারবে আপনার পোস্ট করা বিজ্ঞাপনটি।",
        icon: <CheckCircle2 className="text-green-500" />,
      });
      navigate('/create-post');
    }, 1200);
  };

  return (
    <section
      aria-label="বিজ্ঞাপন পোস্ট করুন"
      tabIndex={0}
      className="space-y-4 p-4 border rounded-lg bg-gray-50 shadow-sm transition hover:shadow-lg focus-within:ring-2 focus-within:ring-primary"
    >
      <h3 className="font-bold text-xl text-primary" tabIndex={0}>
        বিজ্ঞাপন পোস্ট করুন
      </h3>
      <ul className="list-disc list-inside text-gray-600 text-sm ml-2 space-y-1" aria-label="বিজ্ঞাপন পোস্টের সুবিধাসমূহ">
        <li>নতুন ক্রেতা ও গ্রাহকের কাছে সহজে পৌঁছান</li>
        <li>পণ্য, সেবা, বা প্রপার্টির বিজ্ঞাপন দিন এক মিনিটেই</li>
        <li>ড্যাশবোর্ড থেকে সহজে বিজ্ঞাপন পরিচালনা করুন</li>
      </ul>
      <div>
        <Button
          aria-label="এখনি বিজ্ঞাপন পোস্ট করুন"
          type="button"
          className={`w-full bg-primary text-white text-base font-semibold py-3 rounded-lg flex gap-2 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 transition 
            active:scale-95 ${loading ? "opacity-80 pointer-events-none" : ""}`}
          size="lg"
          onClick={handlePostAd}
          disabled={loading}
        >
          <Plus className="h-5 w-5 mr-2" />
          {loading ? (
            <span>
              <span className="animate-spin mr-2 inline-block align-middle">&#9696;</span> পোস্ট হচ্ছে...
            </span>
          ) : (
            "এখনি বিজ্ঞাপন পোস্ট করুন"
          )}
        </Button>
      </div>
    </section>
  );
};
