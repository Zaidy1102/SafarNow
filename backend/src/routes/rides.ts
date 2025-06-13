import express from 'express';
import mongoose from 'mongoose';
import Ride from '../models/Ride';
import User from '../models/User';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Book a ride
router.post('/book', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const { pickup, dropoff, fare, distance, duration } = req.body;
    const passengerId = req.user.userId;

    const ride = new Ride({
      passenger: passengerId,
      pickup,
      dropoff,
      fare,
      distance,
      duration,
    });

    await ride.save();

    // Notify nearby drivers (implement with Socket.IO)
    // io.emit('newRide', ride);

    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Error booking ride' });
  }
});

// Accept a ride (driver only)
router.post('/:rideId/accept', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const { rideId } = req.params;
    const driverId = req.user.userId;

    // Check if user is a driver
    const driver = await User.findById(driverId);
    if (!driver || driver.userType !== 'driver') {
      return res.status(403).json({ message: 'Only drivers can accept rides' });
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.status !== 'pending') {
      return res.status(400).json({ message: 'Ride is no longer available' });
    }

    ride.driver = new mongoose.Types.ObjectId(driverId);
    ride.status = 'accepted';
    await ride.save();

    // Notify passenger (implement with Socket.IO)
    // io.to(ride.passenger.toString()).emit('rideAccepted', ride);

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting ride' });
  }
});

// Update ride status
router.patch('/:rideId/status', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const { rideId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if user is either the passenger or driver
    if (ride.passenger.toString() !== userId && ride.driver?.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    ride.status = status;
    await ride.save();

    // Notify relevant parties (implement with Socket.IO)
    // io.to(ride.passenger.toString()).emit('rideStatusUpdated', ride);
    // if (ride.driver) {
    //   io.to(ride.driver.toString()).emit('rideStatusUpdated', ride);
    // }

    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ride status' });
  }
});

// Get user's rides
router.get('/my-rides', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'User not authenticated' });
    const userId = req.user.userId;
    const user = await User.findById(userId);

    let rides;
    if (user?.userType === 'driver') {
      rides = await Ride.find({ driver: userId });
    } else {
      rides = await Ride.find({ passenger: userId });
    }

    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rides' });
  }
});

export default router; 