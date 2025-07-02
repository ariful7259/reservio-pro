
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Truck, MapPin, Clock, Package, Plus, 
  Settings, CheckCircle2, AlertTriangle 
} from 'lucide-react';

interface ShippingZone {
  id: string;
  name: string;
  areas: string[];
  rate: number;
  freeShippingThreshold?: number;
}

const ShippingConfiguration: React.FC = () => {
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'ঢাকা শহর',
      areas: ['ধানমন্ডি', 'গুলশান', 'বনানী', 'উত্তরা'],
      rate: 60,
      freeShippingThreshold: 1000
    },
    {
      id: '2',
      name: 'ঢাকার বাইরে',
      areas: ['চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা'],
      rate: 120,
      freeShippingThreshold: 2000
    }
  ]);

  const [newZone, setNewZone] = useState({
    name: '',
    areas: '',
    rate: 0,
    freeShippingThreshold: 0
  });

  const [courierSettings, setCourierSettings] = useState({
    pathao: { enabled: true, apiKey: '' },
    ecourier: { enabled: false, apiKey: '' },
    steadfast: { enabled: false, apiKey: '' },
    redx: { enabled: false, apiKey: '' }
  });

  const addShippingZone = () => {
    if (newZone.name && newZone.areas && newZone.rate > 0) {
      const zone: ShippingZone = {
        id: Date.now().toString(),
        name: newZone.name,
        areas: newZone.areas.split(',').map(area => area.trim()),
        rate: newZone.rate,
        freeShippingThreshold: newZone.freeShippingThreshold || undefined
      };
      setShippingZones([...shippingZones, zone]);
      setNewZone({ name: '', areas: '', rate: 0, freeShippingThreshold: 0 });
    }
  };

  const toggleCourier = (courier: string) => {
    setCourierSettings(prev => ({
      ...prev,
      [courier]: { ...prev[courier as keyof typeof prev], enabled: !prev[courier as keyof typeof prev].enabled }
    }));
  };

  const courierList = [
    { key: 'pathao', name: 'পাঠাও', icon: '🛵', color: 'bg-red-500' },
    { key: 'ecourier', name: 'ইকুরিয়ার', icon: '📦', color: 'bg-blue-500' },
    { key: 'steadfast', name: 'স্টেডফাস্ট', icon: '🚚', color: 'bg-green-500' },
    { key: 'redx', name: 'রেডএক্স', icon: '🔴', color: 'bg-red-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">শিপিং কনফিগারেশন</h2>
        <p className="text-gray-600">আপনার ডেলিভারি এবং শিপিং অপশন সেট করুন</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              শিপিং জোন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shippingZones.map((zone) => (
              <div key={zone.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{zone.name}</h4>
                  <Badge>৳{zone.rate}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  এলাকা: {zone.areas.join(', ')}
                </p>
                {zone.freeShippingThreshold && (
                  <p className="text-xs text-green-600">
                    ৳{zone.freeShippingThreshold}+ এর অর্ডারে ফ্রি ডেলিভারি
                  </p>
                )}
              </div>
            ))}

            {/* Add New Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h4 className="font-medium mb-3">নতুন জোন যোগ করুন</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="zoneName">জোনের নাম</Label>
                  <Input
                    id="zoneName"
                    placeholder="যেমন: ঢাকা শহর"
                    value={newZone.name}
                    onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zoneAreas">এলাকাসমূহ (কমা দিয়ে আলাদা করুন)</Label>
                  <Textarea
                    id="zoneAreas"
                    placeholder="ধানমন্ডি, গুলশান, বনানী"
                    value={newZone.areas}
                    onChange={(e) => setNewZone({...newZone, areas: e.target.value})}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="zoneRate">ডেলিভারি চার্জ (৳)</Label>
                    <Input
                      id="zoneRate"
                      type="number"
                      placeholder="60"
                      value={newZone.rate || ''}
                      onChange={(e) => setNewZone({...newZone, rate: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="freeThreshold">ফ্রি ডেলিভারি (৳)</Label>
                    <Input
                      id="freeThreshold"
                      type="number"
                      placeholder="1000"
                      value={newZone.freeShippingThreshold || ''}
                      onChange={(e) => setNewZone({...newZone, freeShippingThreshold: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <Button onClick={addShippingZone} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  জোন যোগ করুন
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courier Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-500" />
              কুরিয়ার ইন্টিগ্রেশন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courierList.map((courier) => (
              <div key={courier.key} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${courier.color} rounded-lg flex items-center justify-center text-white`}>
                      <span>{courier.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{courier.name}</h4>
                      <p className="text-sm text-gray-600">অটো বুকিং সিস্টেম</p>
                    </div>
                  </div>
                  <Switch
                    checked={courierSettings[courier.key as keyof typeof courierSettings].enabled}
                    onCheckedChange={() => toggleCourier(courier.key)}
                  />
                </div>
                
                {courierSettings[courier.key as keyof typeof courierSettings].enabled && (
                  <div>
                    <Label htmlFor={`${courier.key}-api`}>API Key</Label>
                    <Input
                      id={`${courier.key}-api`}
                      placeholder="আপনার API Key"
                      value={courierSettings[courier.key as keyof typeof courierSettings].apiKey}
                      onChange={(e) => setCourierSettings(prev => ({
                        ...prev,
                        [courier.key]: { ...prev[courier.key as keyof typeof prev], apiKey: e.target.value }
                      }))}
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            ডেলিভারি সেটিংস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="processingTime">প্রসেসিং টাইম (দিন)</Label>
              <Input
                id="processingTime"
                type="number"
                placeholder="1"
                defaultValue="1"
              />
              <p className="text-xs text-gray-600 mt-1">অর্ডার প্রস্তুত করতে সময়</p>
            </div>
            
            <div>
              <Label htmlFor="deliveryTime">ডেলিভারি টাইম (দিন)</Label>
              <Input
                id="deliveryTime"
                type="number"
                placeholder="3"
                defaultValue="3"
              />
              <p className="text-xs text-gray-600 mt-1">ডেলিভারি হতে সময়</p>
            </div>
            
            <div>
              <Label htmlFor="minOrder">মিনিমাম অর্ডার (৳)</Label>
              <Input
                id="minOrder"
                type="number"
                placeholder="500"
                defaultValue="500"
              />
              <p className="text-xs text-gray-600 mt-1">নূন্যতম অর্ডার পরিমাণ</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-500" />
            শিপিং সংক্ষেপ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">{shippingZones.length}</div>
              <div className="text-sm text-gray-600">শিপিং জোন</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold">
                {Object.values(courierSettings).filter(c => c.enabled).length}
              </div>
              <div className="text-sm text-gray-600">সক্রিয় কুরিয়ার</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">1-3</div>
              <div className="text-sm text-gray-600">দিন ডেলিভারি</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold">৯৮%</div>
              <div className="text-sm text-gray-600">সফল ডেলিভারি</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-purple-600">
          <Settings className="h-4 w-4 mr-2" />
          শিপিং সেটিংস সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default ShippingConfiguration;
