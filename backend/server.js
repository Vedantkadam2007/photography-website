const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple file-based storage (fallback when MongoDB is not available)
const PHOTOS_FILE = path.join(__dirname, 'data', 'photos.json');

// Helper functions for file-based storage
const readPhotos = () => {
  try {
    if (fs.existsSync(PHOTOS_FILE)) {
      const data = fs.readFileSync(PHOTOS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading photos file:', error);
    return [];
  }
};

const writePhotos = (photos) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(PHOTOS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing photos file:', error);
    return false;
  }
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photography', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
  console.log('Using file-based storage instead');
});

// Photo Schema
const photoSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  filename: String,
  filepath: String,
  createdAt: { type: Date, default: Date.now },
});

const Photo = mongoose.model('Photo', photoSchema);

// Multer Configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
app.get('/api/photos', async (req, res) => {
  try {
    const { category } = req.query;
    
    // Use MongoDB if connected, otherwise use file-based storage
    if (mongoose.connection.readyState === 1) {
      const filter = category ? { category } : {};
      const photos = await Photo.find(filter).sort({ createdAt: -1 });
      res.json(photos);
    } else {
      // File-based storage
      let photos = readPhotos();
      if (category) {
        photos = photos.filter(photo => photo.category === category);
      }
      photos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.json(photos);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/photos', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const photoData = {
      title,
      description,
      category,
      filename: req.file.filename,
      filepath: req.file.path,
      createdAt: new Date().toISOString(),
    };

    // Use MongoDB if connected, otherwise use file-based storage
    if (mongoose.connection.readyState === 1) {
      const photo = new Photo(photoData);
      const savedPhoto = await photo.save();
      res.status(201).json(savedPhoto);
    } else {
      // File-based storage
      const photos = readPhotos();
      const newPhoto = {
        ...photoData,
        _id: Date.now().toString(), // Simple ID for file-based storage
      };
      photos.push(newPhoto);
      
      if (writePhotos(photos)) {
        res.status(201).json(newPhoto);
      } else {
        res.status(500).json({ message: 'Failed to save photo data' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Photo.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
