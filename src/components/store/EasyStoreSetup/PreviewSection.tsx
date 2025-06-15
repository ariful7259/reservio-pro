import React from "react";
import { OrderTrackingSection } from ".";

interface PreviewSectionProps {
  isLinkInBio: boolean;
  storeData: any;
  linkInBioData: any;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  isLinkInBio,
  storeData,
  linkInBioData
}) => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-gray-800 rounded-[2.5rem] p-2">
        <div className="bg-white rounded-[2rem] overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 flex items-center justify-center text-xs text-gray-600">
            {isLinkInBio ? linkInBioData.displayName : storeData.businessName}.basabari.com
          </div>
          <div className="p-6 min-h-[500px]">
            {!isLinkInBio ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">{storeData.businessName}</h3>
                  <p className="text-sm text-gray-600">{storeData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-100 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 bg-blue-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-xs font-medium">পণ্য ১</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 bg-green-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-xs font-medium">পণ্য ২</p>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 bg-yellow-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-xs font-medium">পণ্য ৩</p>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-3 text-center">
                    <div className="w-12 h-12 bg-purple-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-xs font-medium">পণ্য ৪</p>
                  </div>
                </div>
                {/* Order tracking fake preview */}
                <OrderTrackingSection status="shipped" />
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                  {linkInBioData.profileImage ? (
                    <img src={linkInBioData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white text-xl font-bold">
                      {linkInBioData.displayName.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{linkInBioData.displayName}</h3>
                  <p className="text-sm text-gray-600">{linkInBioData.bio}</p>
                </div>
                <div className="space-y-3">
                  {linkInBioData.links.map((link: any, index: number) => (
                    <div key={index} className="bg-purple-100 hover:bg-purple-200 rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors">
                      <span className="font-medium">{link.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
