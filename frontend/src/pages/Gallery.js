import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Filter, Grid, List, Search, Heart, Eye } from 'lucide-react';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPhotos = photos.filter(photo => 
    photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    photo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="premium-loading w-16 h-16 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen animated-luxury-bg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold heading-display text-gradient mb-4">Gallery</h1>
          <p className="text-xl text-gray-400 heading-luxury max-w-2xl mx-auto">
            Explore our curated collection of premium photography masterpieces
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-input w-full pl-12 pr-4 py-3 rounded-full"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`btn-premium px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === ''
                  ? 'bg-accent text-black'
                  : 'bg-dark-card text-gray-300 hover:bg-accent hover:text-black'
              }`}
            >
              All Photos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn-premium px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-black'
                    : 'bg-dark-card text-gray-300 hover:bg-accent hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-accent text-black' 
                  : 'bg-dark-card text-gray-300 hover:bg-accent hover:text-black'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-accent text-black' 
                  : 'bg-dark-card text-gray-300 hover:bg-accent hover:text-black'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <Filter className="h-16 w-16 text-accent mx-auto mb-4" />
            </div>
            <p className="text-2xl text-gray-400 mb-4">No photos found</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'image-grid' : 'space-y-6'}>
            {filteredPhotos.map((photo, index) => (
              <Link
                key={photo._id}
                to={`/photo/${photo._id}`}
                className={`premium-card image-card ${viewMode === 'list' ? 'flex' : ''}`}
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                  <img
                    src={`/uploads/${photo.filename}`}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`image-overlay ${viewMode === 'list' ? 'static' : ''}`}>
                  <div className={viewMode === 'list' ? 'p-6' : ''}>
                    <h3 className="text-xl font-bold mb-2 heading-luxury">{photo.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{photo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-accent bg-opacity-20 text-accent text-sm rounded-full capitalize">
                        {photo.category}
                      </span>
                      <div className="flex items-center space-x-3 text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span className="text-xs">View</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">Like</span>
                        </span>
                      </div>
                    </div>
                  </div>
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
