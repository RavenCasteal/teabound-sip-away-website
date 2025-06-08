import React, { useEffect, useRef } from 'react';

interface MapProps {
  stores: Array<{
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }>;
  userLocation?: {
    lat: number;
    lng: number;
  } | null;
  deliveryLocation?: {
    lat: number;
    lng: number;
  } | null;
  selectedStoreId?: string;
  onStoreSelect?: (storeId: string) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export const Map: React.FC<MapProps> = ({
  stores,
  userLocation,
  deliveryLocation,
  selectedStoreId,
  onStoreSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers();
    }
  }, [stores, userLocation, deliveryLocation, selectedStoreId]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 47.6062, lng: -122.3321 }; // Seattle coordinates
    const mapOptions = {
      center: defaultCenter,
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
    updateMarkers();
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add store markers
    stores.forEach(store => {
      const marker = new window.google.maps.Marker({
        position: store.coordinates,
        map: mapInstanceRef.current,
        title: store.name,
        icon: {
          url: selectedStoreId === store.id
            ? '/images/store-marker-selected.png'
            : '/images/store-marker.png',
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      marker.addListener('click', () => {
        if (onStoreSelect) {
          onStoreSelect(store.id);
        }
      });

      markersRef.current.push(marker);
    });

    // Add user location marker
    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        icon: {
          url: '/images/user-marker.png',
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });
      markersRef.current.push(userMarker);
    }

    // Add delivery location marker
    if (deliveryLocation) {
      const deliveryMarker = new window.google.maps.Marker({
        position: deliveryLocation,
        map: mapInstanceRef.current,
        icon: {
          url: '/images/delivery-marker.png',
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });
      markersRef.current.push(deliveryMarker);

      // Draw delivery route
      if (userLocation) {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: mapInstanceRef.current,
          suppressMarkers: true
        });

        directionsService.route(
          {
            origin: userLocation,
            destination: deliveryLocation,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result: any, status: string) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
            }
          }
        );
      }
    }

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
}; 