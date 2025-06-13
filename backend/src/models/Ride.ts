import mongoose from 'mongoose';

export interface IRide extends mongoose.Document {
  passenger: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;
  pickup: {
    lat: number;
    lng: number;
    address: string;
  };
  dropoff: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  fare: number;
  distance: number;
  duration: number;
  paymentStatus: 'pending' | 'completed';
  rating?: number;
  feedback?: string;
}

const rideSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pickup: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  dropoff: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  fare: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IRide>('Ride', rideSchema); 