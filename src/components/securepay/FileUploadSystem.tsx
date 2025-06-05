
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, File, Image, Video, FileText, Code,
  Download, Trash2, Eye, Share2, Lock, Cloud
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'uploading' | 'completed' | 'failed';
  progress?: number;
  url?: string;
}

const FileUploadSystem = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'logo-design.png',
      size: 2048000,
      type: 'image/png',
      uploadDate: '২৫ নভেম্বর, ২০২৪',
      status: 'completed',
      url: '#'
    },
    {
      id: '2',
      name: 'project-brief.pdf',
      size: 1024000,
      type: 'application/pdf',
      uploadDate: '২৪ নভেম্বর, ২০২৪',
      status: 'completed',
      url: '#'
    }
  ]);
  const [dragOver, setDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '০ Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-8 w-8 text-blue-600" />;
    if (type.startsWith('video/')) return <Video className="h-8 w-8 text-purple-600" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-8 w-8 text-red-600" />;
    if (type.includes('code') || type.includes('text')) return <Code className="h-8 w-8 text-green-600" />;
    return <File className="h-8 w-8 text-gray-600" />;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles);
  }, []);

  const handleFileUpload = (fileList: File[]) => {
    fileList.forEach((file) => {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast({
          title: "ফাইল সাইজ বড়",
          description: "ফাইল সাইজ ১০০ MB এর চেয়ে কম হতে হবে",
          variant: "destructive"
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toLocaleDateString('bn-BD'),
        status: 'uploading',
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === newFile.id && f.status === 'uploading') {
            const newProgress = (f.progress || 0) + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, status: 'completed', progress: 100, url: '#' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        }));
      }, 200);
    });

    toast({
      title: "আপলোড শুরু হয়েছে",
      description: `${fileList.length}টি ফাইল আপলোড হচ্ছে`,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      handleFileUpload(Array.from(fileList));
    }
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "ফাইল ডিলিট হয়েছে",
      description: "ফাইল সফলভাবে ডিলিট করা হয়েছে",
    });
  };

  const fileCategories = [
    { type: 'image', label: 'ইমেজ', formats: 'JPG, PNG, GIF, WebP', icon: <Image className="h-5 w-5" />, color: 'bg-blue-100' },
    { type: 'video', label: 'ভিডিও', formats: 'MP4, AVI, MOV, WebM', icon: <Video className="h-5 w-5" />, color: 'bg-purple-100' },
    { type: 'document', label: 'ডকুমেন্ট', formats: 'PDF, DOC, PPT, XLS', icon: <FileText className="h-5 w-5" />, color: 'bg-red-100' },
    { type: 'code', label: 'কোড', formats: 'HTML, CSS, JS, PSD', icon: <Code className="h-5 w-5" />, color: 'bg-green-100' }
  ];

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            ফাইল আপলোড সিস্টেম
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">ফাইল আপলোড করুন</h3>
            <p className="text-gray-500 mb-4">
              ড্র্যাগ এন্ড ড্রপ করুন অথবা ক্লিক করে ফাইল নির্বাচন করুন
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.html,.css,.js"
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                ফাইল নির্বাচন করুন
              </Button>
            </label>
            <p className="text-xs text-gray-400 mt-2">
              সর্বোচ্চ ১০০ MB • ইমেজ, ভিডিও, ডকুমেন্ট ও কোড ফাইল সাপোর্ট করে
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File Categories */}
      <Card>
        <CardHeader>
          <CardTitle>সাপোর্টেড ফাইল টাইপ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fileCategories.map((category, index) => (
              <div key={index} className={`${category.color} p-4 rounded-lg text-center`}>
                <div className="text-gray-700 mb-2 flex justify-center">
                  {category.icon}
                </div>
                <h4 className="font-medium text-lg mb-1">{category.label}</h4>
                <p className="text-sm text-gray-600">{category.formats}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>আপলোডেড ফাইল</span>
            <Badge variant="outline">{files.length} ফাইল</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{file.name}</p>
                    <Badge 
                      className={
                        file.status === 'completed' ? 'bg-green-100 text-green-800' :
                        file.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {file.status === 'completed' ? 'সম্পন্ন' :
                       file.status === 'uploading' ? 'আপলোডিং' : 'ব্যর্থ'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{file.uploadDate}</span>
                  </div>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress || 0} className="mt-2" />
                  )}
                </div>

                <div className="flex gap-1">
                  {file.status === 'completed' && (
                    <>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleDelete(file.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {files.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Cloud className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>কোনো ফাইল আপলোড করা হয়নি</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-green-600" />
            নিরাপত্তা ফিচার
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">ফাইল এনক্রিপশন:</h4>
              <ul className="text-sm space-y-1">
                <li>✓ AES-256 এনক্রিপশন</li>
                <li>✓ SSL/TLS ট্রান্সমিশন</li>
                <li>✓ সিকিউর ক্লাউড স্টোরেজ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">অ্যাক্সেস কন্ট্রোল:</h4>
              <ul className="text-sm space-y-1">
                <li>✓ পারমিশন ভিত্তিক অ্যাক্সেস</li>
                <li>✓ ফাইল এক্সপায়ারি ডেট</li>
                <li>✓ ডাউনলোড ট্র্যাকিং</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadSystem;
