
import React from 'react';
import { Upload, X, Video, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoUploadProps {
  uploadedVideos: File[];
  currentVideoIndex: number;
  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveVideo: (index: number) => void;
  onNextVideo: () => void;
  onPrevVideo: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  uploadedVideos,
  currentVideoIndex,
  onVideoUpload,
  onRemoveVideo,
  onNextVideo,
  onPrevVideo
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        <Video className="h-4 w-4 inline mr-1" />
        ভিডিও আপলোড করুন
      </label>
      <div className="mt-2">
        <input
          id="videos"
          type="file"
          multiple
          accept="video/*"
          onChange={onVideoUpload}
          className="hidden"
        />
        <label
          htmlFor="videos"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <Video className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">একাধিক ভিডিও নির্বাচন করুন</span>
        </label>
      </div>

      {/* Video Player with Navigation */}
      {uploadedVideos.length > 0 && (
        <div className="mt-3">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              src={URL.createObjectURL(uploadedVideos[currentVideoIndex])}
              className="w-full h-48 object-cover"
              controls
            />
            
            {/* Video Navigation */}
            {uploadedVideos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={onPrevVideo}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onNextVideo}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Video Counter */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {currentVideoIndex + 1}/{uploadedVideos.length}
            </div>

            {/* Remove Video Button */}
            <button
              type="button"
              onClick={() => onRemoveVideo(currentVideoIndex)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
