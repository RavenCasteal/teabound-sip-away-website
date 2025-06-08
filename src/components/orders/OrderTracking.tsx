import React, { useState, useEffect } from 'react';

interface OrderStatus {
  id: string;
  status: 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  updates: {
    timestamp: string;
    message: string;
  }[];
}

interface OrderTrackingProps {
  orderId: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setLoading(true);
        // Implement your order status fetch logic here
        // Example: const status = await getOrderStatus(orderId);
        // setOrderStatus(status);
      } catch (err) {
        setError('Failed to fetch order status');
        console.error('Order status fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
    // Set up polling for real-time updates
    const interval = setInterval(fetchOrderStatus, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        {error}
      </div>
    );
  }

  if (!orderStatus) {
    return (
      <div className="p-4 bg-muted text-muted-foreground rounded-lg">
        Order not found
      </div>
    );
  }

  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-500';
      case 'ready':
        return 'bg-blue-500';
      case 'out_for_delivery':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Order Status</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Order ID:</span>
          <span className="font-mono">{orderId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Estimated Delivery:</span>
          <span>{orderStatus.estimatedDelivery}</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {orderStatus.updates.map((update, index) => (
          <div key={index} className="relative pl-12 pb-8">
            <div className={`absolute left-0 w-8 h-8 rounded-full ${getStatusColor(orderStatus.status)} flex items-center justify-center text-white`}>
              {index + 1}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{update.message}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(update.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {orderStatus.currentLocation && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Location</h3>
          <div className="h-48 bg-muted rounded-lg">
            {/* Implement map component here */}
            {/* Example: <Map location={orderStatus.currentLocation} /> */}
          </div>
        </div>
      )}
    </div>
  );
}; 