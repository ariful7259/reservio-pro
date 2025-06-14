
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { serviceCategories } from './serviceData';
import { CustomService } from './serviceTypes';

interface ServiceSelectionModalProps {
  open: boolean;
  onClose: () => void;
  selectedServices: CustomService[];
  onAddService: (service: CustomService) => void;
  onRemoveService: (serviceId: string) => void;
}

export const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({
  open, onClose, selectedServices, onAddService, onRemoveService
}) => {
  // সব সার্ভিস এক জায়গায় আনা (rent, service, marketplace subcategories সহ)
  const allServices = useMemo(() => {
    let list: CustomService[] = [];
    serviceCategories.forEach(cat => {
      if (cat.subCategories && cat.subCategories.length) {
        cat.subCategories.forEach(sub => {
          list.push({
            id: sub.path,
            name: sub.name,
            icon: sub.name
          })
        });
      } else {
        list.push({
          id: cat.path,
          name: cat.name,
          icon: cat.name
        });
      }
    });
    // নাম alfabetically sort
    return list.sort((a, b) => a.name.localeCompare(b.name, 'bn'));
  }, []);

  // অনুসন্ধান (search)
  const [search, setSearch] = useState("");

  // যেগুলো add আছে
  const selectedIds = selectedServices.map(s => s.id);

  // ফিল্টার করা সার্ভিস
  const filteredList = allServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // বাকি available (আগে add হয়নি)
  const availableServices = filteredList.filter(s => !selectedIds.includes(s.id));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>সার্ভিস নির্বাচন করুন</DialogTitle>
          <DialogDescription>আপনি সর্বাধিক ১২টি সার্ভিস যোগ করতে পারবেন। আগের যোগ করা সার্ভিসও এখানে দেখতে ও রিমুভ করতে পারবেন।</DialogDescription>
        </DialogHeader>

        {/* Already Added services (with remove option) */}
        {selectedServices.length > 0 && (
          <div className="mb-3">
            <div className="font-medium mb-1 pl-1 text-sm text-primary">ইতিমধ্যেই যোগ করা সার্ভিস</div>
            <div className="flex flex-wrap gap-2 min-h-[42px]">
              {selectedServices.map(service => (
                <div
                  key={service.id}
                  className="flex items-center px-3 py-1.5 border rounded-full bg-primary/5 hover:bg-primary/10 text-primary text-sm shadow-sm gap-2"
                >
                  <span>{service.name}</span>
                  <button
                    onClick={() => onRemoveService(service.id)}
                    className="ml-0.5 flex items-center rounded-full hover:bg-red-100 focus:outline-none transition w-5 h-5"
                    aria-label="Remove"
                    type="button"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search box */}
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-3 text-sm"
          placeholder="সার্ভিস সার্চ করুন"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Available services to add */}
        <div className="max-h-[320px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableServices.map(service => (
            <div
              key={service.id}
              className="flex items-center justify-between border rounded-lg p-3 bg-white transition group hover:bg-blue-50"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-primary font-bold">
                  {service.name[0]}
                </div>
                <span className="font-medium text-sm">{service.name}</span>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="ml-2"
                aria-label="Add"
                onClick={() => onAddService(service)}
              >
                +
              </Button>
            </div>
          ))}
          {availableServices.length === 0 && (
            <div className="col-span-2 text-center text-gray-400 py-8">এই সার্ভিস লিস্টে কিছুই নেই অথবা সব যোগ হয়ে গেছে</div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            বন্ধ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
