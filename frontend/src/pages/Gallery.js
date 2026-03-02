import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPhotos();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const url = selectedCategory 
        ? `/api/photos?category=${selectedCategory}`
        : '/api/photos';
      const response = await axios.get(url);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Photo Gallery</h1>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === ''
                  ? 'bg-accent text-white'
                  : 'bg-dark-card hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-dark-card hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No photos found</p>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map(photo => (
              <Link
                key={photo._id}
                to={`/photo/${photo._id}`}
                className="photo-card"
              >
                <img
                  src={`/uploads/${photo.filename}`}
                  alt={photo.title}
                  loading="lazy"
                />
                <div className="photo-info">
                  <h3 className="photo-title">{photo.title}</h3>
                  <p className="photo-description">{photo.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-accent text-xs rounded-full capitalize">
                    {photo.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
