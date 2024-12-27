import dynamic from 'next/dynamic';
import React, { useRef, useImperativeHandle, forwardRef } from 'react'; // Import React and necessary hooks

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
});

const Map = (props, ref) => {
  const mapRef = React.useRef(null); // Reference to the map instance

  // Expose the flyTo function to parent components
  useImperativeHandle(ref, () => ({
    flyTo: (lat, lng) => {
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lng], 14); // Fly to the provided coordinates at zoom level 14
      }
    },
  }));

  // Define the updated map bounds (latitude and longitude bounds to limit panning)
  const bounds = [
    [31.218894, -111.938791], // South West corner (latitude, longitude)
    [32.660329, -109.910668], // North East corner (latitude, longitude)
  ];

  const mapOptions = {
    maxZoom: 19, // Limit the max zoom level to 14
    minZoom: 7, // Set a minimum zoom level if needed (optional)
    maxBounds: bounds, // Restrict the map to a specific area
    maxBoundsViscosity: 1.0, // Make the map stick to the max bounds
    zoomControl: true, // Enable zoom controls
    scrollWheelZoom: true, // Allow zooming with the mouse wheel
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DynamicMap ref={mapRef} {...props} options={mapOptions} />
    </div>
  );
};

export default forwardRef(Map); // Forward the ref to the map component
