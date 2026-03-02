# Photography Portfolio Website

A full-stack photography portfolio website built with React (frontend) and Node.js/Express (backend).

## Features

- **Gallery View**: Browse photos with category filtering
- **Photo Upload**: Upload photos with title, description, and category
- **Photo Details**: View detailed information about each photo
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Lucide icons
- **Image Management**: Store and serve images via backend API

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons
- Framer Motion for animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- CORS for cross-origin requests

## Project Structure

```
photography-website/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main App component
│   │   └── index.js      # Entry point
│   ├── package.json      # Frontend dependencies
│   ├── tailwind.config.js
│   └── postcss.config.js
└── package.json          # Root package.json
```

## Installation

1. Clone the repository
2. Install dependencies for all packages:
   ```bash
   npm run install-all
   ```

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Environment Variables

Create a `.env` file in the `backend` directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/photography
```

If using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

### Create Uploads Directory

Create an `uploads` directory in the `backend` folder to store uploaded images:

```bash
mkdir backend/uploads
```

## Running the Application

### Development Mode

Start both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Individual Services

Start only the backend:
```bash
npm run server
```

Start only the frontend:
```bash
npm run client
```

## API Endpoints

### Photos
- `GET /api/photos` - Get all photos (with optional category filter)
- `GET /api/photos/:id` - Get a specific photo by ID
- `POST /api/photos` - Upload a new photo
- `DELETE /api/photos/:id` - Delete a photo

### Categories
- `GET /api/categories` - Get all unique categories

## Usage

1. **View Gallery**: Navigate to `/gallery` to see all uploaded photos
2. **Upload Photos**: Go to `/upload` to add new photos to the gallery
3. **Filter by Category**: Use category filters in the gallery view
4. **View Details**: Click on any photo to see detailed information

## Features in Detail

### Gallery Page
- Grid layout displaying all photos
- Category filtering
- Responsive design for mobile and desktop
- Hover effects and smooth transitions

### Upload Page
- Image preview before upload
- Form validation
- Progress feedback
- Success/error messages

### Photo Detail Page
- Full-size image display
- Photo metadata
- Navigation back to gallery

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
