import React, { useState, useEffect } from 'react';
import { Map } from './Map';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  waitTime: number;
  parkingSpots: number;
  isOpen: boolean;
}

interface DeliveryStatus {
  orderId: string;
  status: 'preparing' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  driver: {
    name: string;
    phone: string;
  };
}

export const LocationServices: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch stores data
    fetchStores();
    // Get user's location
    getUserLocation();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      // Implement your store fetch logic here
      // Example: const response = await fetch('/api/stores');
      // const data = await response.json();
      // setStores(data);
      
      // Temporary mock data
      setStores([
        {
          id: '1',
          name: 'Downtown Location',
          address: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          phone: '(555) 123-4567',
          hours: {
            Monday: '7:00 AM - 9:00 PM',
            Tuesday: '7:00 AM - 9:00 PM',
            Wednesday: '7:00 AM - 9:00 PM',
            Thursday: '7:00 AM - 9:00 PM',
            Friday: '7:00 AM - 10:00 PM',
            Saturday: '8:00 AM - 10:00 PM',
            Sunday: '8:00 AM - 8:00 PM'
          },
          coordinates: {
            lat: 47.6062,
            lng: -122.3321
          },
          waitTime: 15,
          parkingSpots: 20,
          isOpen: true
        }
      ]);
    } catch (err) {
      setError('Failed to fetch stores');
      console.error('Store fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getWaitTimeColor = (minutes: number) => {
    if (minutes <= 10) return 'text-green-500';
    if (minutes <= 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Location Services</h2>

      {/* Store Locator */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Find a Store</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Component */}
          <div className="h-96 bg-muted rounded-lg">
            <Map
              stores={stores}
              userLocation={userLocation || undefined}
              selectedStoreId={selectedStore?.id}
              onStoreSelect={id => setSelectedStore(stores.find(s => s.id === id) || null)}
            />
          </div>

          {/* Store List */}
          <div className="space-y-4">
            {stores.map(store => (
              <div
                key={store.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedStore?.id === store.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{store.name}</h4>
                    <p className="text-sm text-muted-foreground">{store.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {store.city}, {store.state} {store.zipCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${getWaitTimeColor(store.waitTime)}`}>
                      {store.waitTime} min wait
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {store.parkingSpots} parking spots
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Store Details */}
      {selectedStore && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Store Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Hours</h4>
                <div className="space-y-1">
                  {Object.entries(selectedStore.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span>{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact</h4>
                <p>{selectedStore.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Parking Information</h4>
                <p>Available parking spots: {selectedStore.parkingSpots}</p>
                <p className="text-sm text-muted-foreground">
                  Free parking for customers
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Current Wait Time</h4>
                <p className={`text-lg ${getWaitTimeColor(selectedStore.waitTime)}`}>
                  {selectedStore.waitTime} minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Tracking */}
      {deliveryStatus && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Delivery Tracking</h3>
          <div className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">{deliveryStatus.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{deliveryStatus.estimatedDelivery}</p>
              </div>
            </div>
            <div className="h-48 bg-muted rounded-lg mb-4">
              {/* Implement delivery map component here */}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Driver</p>
                <p className="font-medium">{deliveryStatus.driver.name}</p>
              </div>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => {
                  // Implement call driver logic
                  console.log('Calling driver:', deliveryStatus.driver.phone);
                }}
              >
                Call Driver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Order Pickup */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Mobile Order Pickup</h3>
        <div className="bg-card rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Order Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your order number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pickup Time</label>
              <input
                type="datetime-local"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => {
                // Implement order pickup logic
                console.log('Processing pickup order');
              }}
            >
              Schedule Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 