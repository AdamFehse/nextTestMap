import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Map from '@components/Map'; // Import the Map component
import Sidebar from '@components/Sidebar/Sidebar'; // Import Sidebar component
import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [31.244725, -111.060728]; // Center coordinates for the map

export default function Home() {
  const [projects, setProjects] = useState([]); // State to store all projects
  const [filteredProjects, setFilteredProjects] = useState([]); // State to store filtered projects
  const mapRef = useRef(null); // Reference to the map

  // Load JSON data once
  useEffect(() => {
    const loadJsonData = async () => {
      const response = await fetch('/nextTestMap/storymapdata.json');
      const jsonData = await response.json();
      setProjects(jsonData); // Set the data
      setFilteredProjects(jsonData); // Initially, show all projects
    };
    loadJsonData();
  }, []);

  return (
    <>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <Sidebar
        projects={projects}
        filteredProjects={filteredProjects}
        setFilteredProjects={setFilteredProjects}
        mapRef={mapRef} // Pass the map ref to the sidebar
      />

      {/* Map */}
      <div className={styles.homeMapContainer} style={{ position: 'relative' }}>
        <Map
          className={styles.homeMap}
          center={DEFAULT_CENTER}
          zoom={9}
          projects={filteredProjects}
          ref={mapRef} // Pass the map ref here
        >
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              {/* Render markers based on JSON data */}
              {filteredProjects.map((project, index) => {
                const lat = parseFloat(project.Latitude);
                const lng = parseFloat(project.Longitude);
                if (!isNaN(lat) && !isNaN(lng)) {
                  return (
                    <Marker key={index} position={[lat, lng]}>
                      <Popup>
                        <strong>{project['Project Name']}</strong>
                        <br />
                        {project['DescriptionShort']}
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </>
          )}
        </Map>
      </div>
    </>
  );
}
