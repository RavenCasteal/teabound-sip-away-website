import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export interface Store {
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

export interface DeliveryStatus {
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

export const locationService = {
  // Get all stores
  getStores: async (): Promise<Store[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Get store by ID
  getStoreById: async (storeId: string): Promise<Store> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/${storeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  },

  // Get stores by location
  getStoresByLocation: async (lat: number, lng: number, radius: number): Promise<Store[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/nearby`, {
        params: { lat, lng, radius }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby stores:', error);
      throw error;
    }
  },

  // Get store wait time
  getStoreWaitTime: async (storeId: string): Promise<number> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/${storeId}/wait-time`);
      return response.data.waitTime;
    } catch (error) {
      console.error('Error fetching wait time:', error);
      throw error;
    }
  },

  // Get store parking availability
  getStoreParking: async (storeId: string): Promise<number> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/${storeId}/parking`);
      return response.data.availableSpots;
    } catch (error) {
      console.error('Error fetching parking availability:', error);
      throw error;
    }
  },

  // Get delivery status
  getDeliveryStatus: async (orderId: string): Promise<DeliveryStatus> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/delivery/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery status:', error);
      throw error;
    }
  },

  // Schedule pickup
  schedulePickup: async (orderId: string, pickupTime: string): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/pickup/schedule`, {
        orderId,
        pickupTime
      });
    } catch (error) {
      console.error('Error scheduling pickup:', error);
      throw error;
    }
  },

  // Get directions
  getDirections: async (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/directions`, {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting directions:', error);
      throw error;
    }
  },

  // Update store wait time
  updateStoreWaitTime: async (storeId: string, waitTime: number): Promise<void> => {
    try {
      await axios.put(`${API_BASE_URL}/stores/${storeId}/wait-time`, {
        waitTime
      });
    } catch (error) {
      console.error('Error updating wait time:', error);
      throw error;
    }
  },

  // Update store parking
  updateStoreParking: async (storeId: string, availableSpots: number): Promise<void> => {
    try {
      await axios.put(`${API_BASE_URL}/stores/${storeId}/parking`, {
        availableSpots
      });
    } catch (error) {
      console.error('Error updating parking:', error);
      throw error;
    }
  }
}; 