
import { useState } from 'react';

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return { fileUrls: [], uploadedFiles: [] };
    
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // ফাইল থেকে URL তৈরি করা
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setFileUrls(prev => [...prev, ...newUrls]);
    
    return { fileUrls: [...fileUrls, ...newUrls], uploadedFiles: [...uploadedFiles, ...newFiles] };
  };

  const removeFile = (index: number) => {
    // ফাইল এবং URL মুছে ফেলা
    const newFiles = [...uploadedFiles];
    const newUrls = [...fileUrls];
    
    // ফাইলের URL রিলিজ করা
    URL.revokeObjectURL(newUrls[index]);
    
    newFiles.splice(index, 1);
    newUrls.splice(index, 1);
    
    setUploadedFiles(newFiles);
    setFileUrls(newUrls);
  };

  const clearFiles = () => {
    // সব ফাইলের URL রিলিজ করা
    fileUrls.forEach(url => URL.revokeObjectURL(url));
    
    setUploadedFiles([]);
    setFileUrls([]);
  };

  return {
    uploadedFiles,
    fileUrls,
    handleFileUpload,
    removeFile,
    clearFiles
  };
};
