import React, { useState, useRef } from 'react';
import { Upload, Video, X, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
  duration?: number;
  thumbnail?: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
}

interface VideoUploadSectionProps {
  onVideosUploaded: (videos: VideoFile[]) => void;
  maxFiles?: number;
  maxSizeGB?: number;
}

export const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({
  onVideosUploaded,
  maxFiles = 10,
  maxSizeGB = 2
}) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1; // Get frame at 1 second
      };
      
      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        }
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (files: FileList) => {
    const newVideos: VideoFile[] = [];
    
    for (let i = 0; i < files.length && videos.length + newVideos.length < maxFiles; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        toast.error(`${file.name} একটি ভিডিও ফাইল নয়`);
        continue;
      }
      
      // Check file size (convert GB to bytes)
      const maxSizeBytes = maxSizeGB * 1024 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error(`${file.name} খুব বড় (সর্বোচ্চ ${maxSizeGB}GB)`);
        continue;
      }
      
      const videoId = `video-${Date.now()}-${i}`;
      const videoFile: VideoFile = {
        id: videoId,
        file,
        name: file.name,
        size: file.size,
        uploadProgress: 0,
        status: 'uploading'
      };
      
      try {
        // Generate thumbnail and get duration
        const [thumbnail, duration] = await Promise.all([
          generateThumbnail(file),
          getVideoDuration(file)
        ]);
        
        videoFile.thumbnail = thumbnail;
        videoFile.duration = duration;
      } catch (error) {
        console.error('Error processing video:', error);
      }
      
      newVideos.push(videoFile);
    }
    
    setVideos(prev => [...prev, ...newVideos]);
    
    // Simulate upload progress for each video
    newVideos.forEach((video) => {
      simulateUpload(video.id);
    });
  };

  const simulateUpload = (videoId: string) => {
    const interval = setInterval(() => {
      setVideos(prev => prev.map(video => {
        if (video.id === videoId) {
          const newProgress = Math.min(video.uploadProgress + Math.random() * 15 + 5, 100);
          const newStatus = newProgress >= 100 ? 'completed' : 'uploading';
          
          if (newProgress >= 100) {
            clearInterval(interval);
            toast.success(`${video.name} সফলভাবে আপলোড হয়েছে!`);
          }
          
          return {
            ...video,
            uploadProgress: newProgress,
            status: newStatus
          };
        }
        return video;
      }));
    }, 500);
  };

  const removeVideo = (videoId: string) => {
    setVideos(prev => prev.filter(video => video.id !== videoId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Call parent callback when videos change
  React.useEffect(() => {
    onVideosUploaded(videos);
  }, [videos, onVideosUploaded]);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Upload className={`h-10 w-10 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              ভিডিও ফাইল আপলোড করুন
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা ক্লিক করে ফাইল সিলেক্ট করুন
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span>সাপোর্টেড: MP4, AVI, MOV, WMV</span>
              <span>•</span>
              <span>সর্বোচ্চ সাইজ: {maxSizeGB}GB</span>
              <span>•</span>
              <span>সর্বোচ্চ {maxFiles}টি ফাইল</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
      />

      {/* Video List */}
      {videos.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">আপলোড করা ভিডিও সমূহ ({videos.length})</h3>
          {videos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail} 
                        alt={video.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    {video.status === 'completed' && (
                      <div className="absolute top-1 right-1">
                        <CheckCircle className="h-4 w-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{video.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{formatFileSize(video.size)}</span>
                      {video.duration && <span>{formatDuration(video.duration)}</span>}
                      <span className="flex items-center gap-1">
                        {video.status === 'completed' && <CheckCircle className="h-3 w-3 text-green-500" />}
                        {video.status === 'error' && <AlertCircle className="h-3 w-3 text-red-500" />}
                        {video.status === 'uploading' && <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />}
                        {video.status === 'completed' ? 'সম্পূর্ণ' : 
                         video.status === 'error' ? 'ত্রুটি' : 'আপলোড হচ্ছে'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {video.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={video.uploadProgress} className="h-1" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(video.uploadProgress)}% সম্পূর্ণ
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {video.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeVideo(video.id);
                      }}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};