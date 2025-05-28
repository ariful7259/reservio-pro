
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Truck, Globe, Share2, BarChart3, Users, Store, Phone, MapPin, ExternalLink, Link } from 'lucide-react';
import { StoreData, LinkInBioData } from './types';

interface PreviewSectionProps {
  isLinkInBio: boolean;
  storeData: StoreData;
  linkInBioData: LinkInBioData;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  isLinkInBio,
  storeData,
  linkInBioData
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">সেটআপ সম্পন্ন করুন</h2>
        <p className="text-muted-foreground">
          {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রায় তৈরি!' : 'আপনার স্টোর প্রায় তৈরি!'} চূড়ান্ত সেটিংস দেখুন
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {isLinkInBio ? (
          // Link in Bio preview
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Share2 className="h-5 w-5 text-purple-600" />
                  সোশ্যাল শেয়ারিং
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">QR কোড জেনারেট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">হোয়াটসঅ্যাপ শেয়ার</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ইনস্টাগ্রাম বায়ো</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  অ্যানালিটিক্স
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ক্লিক ট্র্যাকিং</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ভিজিটর কাউন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">লিংক পারফরম্যান্স</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  কাস্টমাইজেশন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">কাস্টম থিম</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ব্র্যান্ড কালার</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">মোবাইল অপটিমাইজড</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Store preview
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  পেমেন্ট রেডি
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">বিকাশ পেমেন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">নগদ পেমেন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ক্যাশ অন ডেলিভারি</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                  ডেলিভারি সেটআপ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ঢাকার মধ্যে: ৬০ টাকা</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ঢাকার বাইরে: ১২০ টাকা</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">৫০০+ টাকায় ফ্রি</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                  অনলাইন উপস্থিতি
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">কাস্টম URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">QR কোড</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">সোশ্যাল শেয়ার</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preview section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {isLinkInBio ? 'আপনার লিংক ইন বায়ো প্রিভিউ' : 'আপনার স্টোর প্রিভিউ'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`border rounded-lg p-4 ${isLinkInBio ? 'bg-gradient-to-r from-purple-50 to-pink-50' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
              {isLinkInBio ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{linkInBioData.displayName || 'আপনার নাম'}</h3>
                    <p className="text-muted-foreground">{linkInBioData.bio || 'আপনার বায়ো'}</p>
                  </div>
                  <div className="space-y-2">
                    {linkInBioData.links.length > 0 ? (
                      linkInBioData.links.map((link, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm">
                          <ExternalLink className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{link.title || 'লিংক শিরোনাম'}</span>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-lg p-3 text-center text-muted-foreground">
                        <Link className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>আপনার লিংকগুলো এখানে দেখাবে</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{storeData.businessName || 'আপনার স্টোর'}</h3>
                    <p className="text-muted-foreground">{storeData.description || 'স্টোর বিবরণ'}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {storeData.phone || '01XXXXXXXXX'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {storeData.address || 'ঠিকানা'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <Badge className={isLinkInBio ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}>
                  {isLinkInBio ? 'লিংক ইন বায়ো URL: ' : 'স্টোর URL: '}
                  {isLinkInBio 
                    ? (linkInBioData.displayName ? `${linkInBioData.displayName.toLowerCase().replace(/\s+/g, '')}.basabari.com` : 'yourname.basabari.com')
                    : (storeData.businessName ? `${storeData.businessName.toLowerCase().replace(/\s+/g, '')}.basabari.com` : 'yourstore.basabari.com')
                  }
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreviewSection;
