import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import type { LatLngTuple } from 'leaflet';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const defaultPosition: LatLngTuple = [34.0522, -118.2437]; // Los Angeles coordinates
  const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Where do you want to go?
        </h1>
        <div className="max-w-2xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Enter pickup location"
            className="input"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter drop-off location"
            className="input"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <button className="btn btn-primary w-full">
            Book Now
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[500px] rounded-lg overflow-hidden shadow-sm">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={defaultPosition} icon={customIcon}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home; 