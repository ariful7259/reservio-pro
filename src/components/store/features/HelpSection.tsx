
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Headphones, Phone, Mail } from 'lucide-react';

const HelpSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 mt-8 border">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-100 rounded-full text-green-600 flex-shrink-0">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">💡 আমরা আপনাকে সাহায্য করব</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            আপনার অনলাইন ব্যবসা শুরু করতে আমাদের এক্সপার্ট টিম ২৪/৭ প্রস্তুত আছে। কোন প্রশ্ন বা সমস্যা থাকলে যোগাযোগ করুন।
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Headphones className="h-3 w-3 mr-1" />
              লাইভ চ্যাট
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Phone className="h-3 w-3 mr-1" />
              ফোন সাপোর্ট
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Mail className="h-3 w-3 mr-1" />
              ইমেইল সাপোর্ট
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
