import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload as UploadIcon, CheckCircle, AlertCircle } from 'lucide-react';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'portrait',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const categories = ['portrait', 'landscape', 'street', 'nature', 'architecture', 'wildlife'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select an image to upload');
      setMessageType('error');
      return;
    }

    const data = new FormData();
    data.append('image', file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);

    try {
      setUploading(true);
      await axios.post('/api/photos', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('Photo uploaded successfully!');
      setMessageType('success');
      
      setTimeout(() => {
        navigate('/gallery');
      }, 2000);
      
    } catch (error) {
      setMessage('Error uploading photo. Please try again.');
      setMessageType('error');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Upload Photo</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            messageType === 'success' 
              ? 'bg-green-900 text-green-200' 
              : 'bg-red-900 text-red-200'
          }`}>
            {messageType === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Image Preview</label>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-dark-card rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                <div className="text-center">
                  <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">No image selected</p>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Choose Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter photo title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              rows="4"
              placeholder="Enter photo description"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={uploading}
              className="btn flex-1"
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/gallery')}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
