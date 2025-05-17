
import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AddServiceButton = () => {
  const navigate = useNavigate();
  
  const goToFeatureSelection = () => {
    navigate('/feature-selection');
  };
  
  return (
    <div className="flex flex-col">
      <button 
        onClick={goToFeatureSelection}
        className="flex flex-col items-center justify-center p-2 border border-dashed rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors h-full min-h-[90px]"
      >
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xs font-medium text-center text-primary">সার্ভিস যোগ করুন</span>
      </button>
    </div>
  );
};
