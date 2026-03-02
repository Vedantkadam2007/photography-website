import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import axios from 'axios';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhoto();
  }, [id]);

  const fetchPhoto = async () => {
    try {
      const response = await axios.get(`/api/photos/${id}`);
      setPhoto(response.data);
    } catch (error) {
      console.error('Error fetching photo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading photo...</p>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="pt-20 text-center py-20">
        <p className="text-xl text-gray-400">Photo not found</p>
        <Link to="/gallery" className="inline-block mt-4 text-accent hover:underline">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/gallery"
          className="inline-flex items-center space-x-2 text-accent hover:underline mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Gallery</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-card rounded-xl p-4">
            <img
              src={`/uploads/${photo.filename}`}
              alt={photo.title}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{photo.title}</h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {photo.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-400">Category:</span>
                <span className="px-3 py-1 bg-accent text-white text-sm rounded-full capitalize">
                  {photo.category}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-400">Uploaded:</span>
                <span className="text-sm">
                  {new Date(photo.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-xl font-semibold mb-3">Photo Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">File Name:</span>
                  <span>{photo.filename}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Photo ID:</span>
                  <span className="font-mono text-xs">{photo._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
