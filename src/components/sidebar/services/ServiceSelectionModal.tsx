
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  // Gather all available services in a single flat list for selection (rent, service, marketplace)
  // serviceCategories থেকে subcategory থাকলে সেগুলা ও আনব, না থাকলে মূল category গুলা।
  const allServices = React.useMemo(() => {
    let list: CustomService[] = [];
    serviceCategories.forEach(cat => {
      if (cat.subCategories && cat.subCategories.length) {
        cat.subCategories.forEach(sub => {
          list.push({
            id: sub.path,
            name: sub.name,
            icon: sub.name // we'll map icon in main grid
          })
        });
      } else {
        list.push({
          id: cat.path,
          name: cat.name,
          icon: cat.name // we'll map icon in main grid
        });
      }
    });
    return list;
  }, []);

  // অনুসন্ধান (search) future proofing, যদি চাইলে
  const [search, setSearch] = useState("");

  // যেগুলো select করা আছে সেই state
  const selectedIds = selectedServices.map(s => s.id);

  // Filter available for search
  const filteredList = allServices.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>সার্ভিস নির্বাচন করুন</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-3 text-sm"
          placeholder="সার্ভিস সার্চ করুন"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="max-h-[320px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredList.map(service => {
            const isSelected = selectedIds.includes(service.id);
            return (
              <div
                key={service.id}
                className={`flex items-center justify-between border rounded-lg p-3 bg-white transition cursor-pointer group
                  ${isSelected ? "border-primary/70 bg-primary/5" : "hover:bg-blue-50" }`}
              >
                <div className="flex items-center gap-2">
                  {/* Dummy icon circle, optionally improve */}
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-primary font-bold">
                    {service.name[0]}
                  </div>
                  <span className="font-medium text-sm">{service.name}</span>
                </div>
                {isSelected ? (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="ml-2"
                    aria-label="Remove"
                    onClick={() => onRemoveService(service.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    variant="outline"
                    className="ml-2"
                    aria-label="Add"
                    onClick={() => onAddService(service)}
                  >
                    +
                  </Button>
                )}
              </div>
            );
          })}
          {filteredList.length === 0 && (
            <div className="col-span-2 text-center text-gray-400 py-8">কোন সার্ভিস পাওয়া যায়নি</div>
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
