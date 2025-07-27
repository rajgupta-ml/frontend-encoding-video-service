import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight, Video, FileVideo } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEncoding } from '../context/EncodingContext';
import Button from '../components/Button';
import { uploadVideo } from '../services/api';

const UploadPage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setCurrentJob } = useEncoding();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }

    // Check file size (limit to 500MB for example)
    if (file.size > 500 * 1024 * 1024) {
      toast.error('File is too large. Please select a video under 500MB');
      return;
    }

    setFile(file);
    toast.success(`Selected ${file.name}`);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a video file first');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading video...');

    try {
      const response = await uploadVideo(file);
      toast.success('Upload successful!', { id: toastId });
      setCurrentJob(response.jobId);
      navigate(`/processing/${response.jobId}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Content-Aware Video Encoding</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        Upload your video for intelligent encoding that optimizes quality and file size based on content analysis.
      </p>
      
      <div 
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 transition-all cursor-pointer mb-8
          ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-600'}
          hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="video/*"
          onChange={handleFileChange}
        />
        
        {file ? (
          <div className="flex flex-col items-center">
            <FileVideo size={48} className="text-blue-500 mb-3" />
            <p className="text-lg font-medium mb-1 text-gray-800 dark:text-white">{file.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <>
            <Upload size={48} className="text-gray-400 mb-3" />
            <p className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Drag & drop your video here</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse</p>
          </>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button 
          variant="primary"
          size="large"
          className="flex-1"
          disabled={!file || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? 'Uploading...' : 'Begin Encoding'}
          <ArrowRight size={18} className="ml-2" />
        </Button>
        
        <Button 
          variant="secondary"
          size="large"
          className="flex-1 flex items-center justify-center"
          onClick={() => navigate('/history')}
        >
          <Video size={18} className="mr-2" />
          Previous Jobs
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;