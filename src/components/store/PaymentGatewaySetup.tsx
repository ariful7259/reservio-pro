
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, Wallet, Landmark, DollarSign, 
  CheckCircle2, AlertCircle, Settings 
} from 'lucide-react';

const PaymentGatewaySetup: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    bkash: { enabled: true, merchantNumber: '' },
    nagad: { enabled: true, merchantNumber: '' },
    rocket: { enabled: false, merchantNumber: '' },
    rupantorpay: { enabled: true, merchantNumber: '' },
    card: { enabled: true, apiKey: '', secretKey: '' },
    bank: { enabled: false, accountNumber: '', routingNumber: '' },
    cod: { enabled: true }
  });

  const togglePaymentMethod = (method: string) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: { ...prev[method as keyof typeof prev], enabled: !prev[method as keyof typeof prev].enabled }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">পেমেন্ট গেটওয়ে সেটআপ</h2>
        <p className="text-gray-600">আপনার কাস্টমারদের জন্য পেমেন্ট অপশন সেট করুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mobile Banking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-pink-500" />
              মোবাইল ব্যাংকিং
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* bKash */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">bK</span>
                </div>
                <div>
                  <h4 className="font-medium">বিকাশ</h4>
                  <p className="text-sm text-gray-600">সবচেয়ে জনপ্রিয় পেমেন্ট</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.bkash.enabled}
                onCheckedChange={() => togglePaymentMethod('bkash')}
              />
            </div>
            {paymentMethods.bkash.enabled && (
              <div className="pl-4 space-y-2">
                <Label htmlFor="bkash-merchant">মার্চেন্ট নম্বর</Label>
                <Input
                  id="bkash-merchant"
                  placeholder="01XXXXXXXXX"
                  value={paymentMethods.bkash.merchantNumber}
                  onChange={(e) => setPaymentMethods(prev => ({
                    ...prev,
                    bkash: { ...prev.bkash, merchantNumber: e.target.value }
                  }))}
                />
              </div>
            )}

            {/* Nagad */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <h4 className="font-medium">নগদ</h4>
                  <p className="text-sm text-gray-600">দ্বিতীয় জনপ্রিয় পেমেন্ট</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.nagad.enabled}
                onCheckedChange={() => togglePaymentMethod('nagad')}
              />
            </div>
            {paymentMethods.nagad.enabled && (
              <div className="pl-4 space-y-2">
                <Label htmlFor="nagad-merchant">মার্চেন্ট নম্বর</Label>
                <Input
                  id="nagad-merchant"
                  placeholder="01XXXXXXXXX"
                  value={paymentMethods.nagad.merchantNumber}
                  onChange={(e) => setPaymentMethods(prev => ({
                    ...prev,
                    nagad: { ...prev.nagad, merchantNumber: e.target.value }
                  }))}
                />
              </div>
            )}

            {/* Rocket */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div>
                  <h4 className="font-medium">রকেট</h4>
                  <p className="text-sm text-gray-600">ডাচ-বাংলা ব্যাংক</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.rocket.enabled}
                onCheckedChange={() => togglePaymentMethod('rocket')}
              />
            </div>
            {paymentMethods.rocket.enabled && (
              <div className="pl-4 space-y-2">
                <Label htmlFor="rocket-merchant">মার্চেন্ট নম্বর</Label>
                <Input
                  id="rocket-merchant"
                  placeholder="01XXXXXXXXX"
                  value={paymentMethods.rocket.merchantNumber}
                  onChange={(e) => setPaymentMethods(prev => ({
                    ...prev,
                    rocket: { ...prev.rocket, merchantNumber: e.target.value }
                  }))}
                />
              </div>
            )}

            {/* Rupantorpay */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RP</span>
                </div>
                <div>
                  <h4 className="font-medium">রূপান্তরপে</h4>
                  <p className="text-sm text-gray-600">নতুন বাংলাদেশী পেমেন্ট</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.rupantorpay.enabled}
                onCheckedChange={() => togglePaymentMethod('rupantorpay')}
              />
            </div>
            {paymentMethods.rupantorpay.enabled && (
              <div className="pl-4 space-y-2">
                <Label htmlFor="rupantorpay-merchant">মার্চেন্ট নম্বর</Label>
                <Input
                  id="rupantorpay-merchant"
                  placeholder="01XXXXXXXXX"
                  value={paymentMethods.rupantorpay.merchantNumber}
                  onChange={(e) => setPaymentMethods(prev => ({
                    ...prev,
                    rupantorpay: { ...prev.rupantorpay, merchantNumber: e.target.value }
                  }))}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              কার্ড পেমেন্ট
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">ডেবিট/ক্রেডিট কার্ড</h4>
                  <p className="text-sm text-gray-600">Visa, MasterCard, Amex</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.card.enabled}
                onCheckedChange={() => togglePaymentMethod('card')}
              />
            </div>
            
            {paymentMethods.card.enabled && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="card-api">API Key</Label>
                  <Input
                    id="card-api"
                    placeholder="আপনার পেমেন্ট গেটওয়ে API Key"
                    value={paymentMethods.card.apiKey}
                    onChange={(e) => setPaymentMethods(prev => ({
                      ...prev,
                      card: { ...prev.card, apiKey: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="card-secret">Secret Key</Label>
                  <Input
                    id="card-secret"
                    type="password"
                    placeholder="আপনার Secret Key"
                    value={paymentMethods.card.secretKey}
                    onChange={(e) => setPaymentMethods(prev => ({
                      ...prev,
                      card: { ...prev.card, secretKey: e.target.value }
                    }))}
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    SSL Commerz বা AamarPay এর সাথে ইন্টিগ্রেট করুন নিরাপদ কার্ড পেমেন্টের জন্য
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bank Transfer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-green-500" />
              ব্যাংক ট্রান্সফার
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Landmark className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-medium">ব্যাংক ট্রান্সফার</h4>
                  <p className="text-sm text-gray-600">সরাসরি ব্যাংক একাউন্ট</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.bank.enabled}
                onCheckedChange={() => togglePaymentMethod('bank')}
              />
            </div>

            {paymentMethods.bank.enabled && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="bank-account">একাউন্ট নম্বর</Label>
                  <Input
                    id="bank-account"
                    placeholder="আপনার ব্যাংক একাউন্ট নম্বর"
                    value={paymentMethods.bank.accountNumber}
                    onChange={(e) => setPaymentMethods(prev => ({
                      ...prev,
                      bank: { ...prev.bank, accountNumber: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="routing-number">রাউটিং নম্বর</Label>
                  <Input
                    id="routing-number"
                    placeholder="ব্যাংকের রাউটিং নম্বর"
                    value={paymentMethods.bank.routingNumber}
                    onChange={(e) => setPaymentMethods(prev => ({
                      ...prev,
                      bank: { ...prev.bank, routingNumber: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cash on Delivery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              ক্যাশ অন ডেলিভারি
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-yellow-500" />
                <div>
                  <h4 className="font-medium">ক্যাশ অন ডেলিভারি</h4>
                  <p className="text-sm text-gray-600">পণ্য পৌঁছানোর পর পেমেন্ট</p>
                </div>
              </div>
              <Switch
                checked={paymentMethods.cod.enabled}
                onCheckedChange={() => togglePaymentMethod('cod')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            পেমেন্ট সেটিংস সংক্ষেপ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(paymentMethods).map(([key, method]) => (
              <div key={key} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  method.enabled ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {method.enabled ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <Badge variant={method.enabled ? "default" : "secondary"}>
                  {key === 'bkash' && 'বিকাশ'}
                  {key === 'nagad' && 'নগদ'}
                  {key === 'rocket' && 'রকেট'}
                  {key === 'rupantorpay' && 'রূপান্তরপে'}
                  {key === 'card' && 'কার্ড'}
                  {key === 'bank' && 'ব্যাংক'}
                  {key === 'cod' && 'COD'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-purple-600">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          পেমেন্ট সেটিংস সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default PaymentGatewaySetup;
