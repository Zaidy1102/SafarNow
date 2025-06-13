# SafarNow - Ride Booking Application

A full-stack Uber-like ride-booking web application built with React, Node.js, and MongoDB.

## Features

- Real-time ride booking and tracking
- Separate interfaces for passengers and drivers
- Live location updates
- Secure authentication
- Responsive design

## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Socket.IO Client
- React Router
- Redux Toolkit

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/safarnow
   JWT_SECRET=your-secret-key
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`

### Database Deployment (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Set up database access
4. Set up network access
5. Get your connection string
6. Update your backend `.env` file with the MongoDB Atlas URI

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 