import { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap'; // Import Button and Offcanvas from React Bootstrap
import styles from './Sidebar.module.scss'; // Import Sidebar styles

const Sidebar = ({ projects, filteredProjects, setFilteredProjects, mapRef }) => {
  const [show, setShow] = useState(false); // State to control sidebar visibility
  const [activeCategory, setActiveCategory] = useState(''); // State to track selected category

  // Function to toggle the sidebar visibility
  const handleToggle = () => setShow(!show);

  // Function to filter projects by category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category) {
      const filtered = projects.filter(
        (project) => project['Project Category'] === category
      );
      setFilteredProjects(filtered); // Filter projects based on the category
    } else {
      setFilteredProjects(projects); // Show all projects if no category is selected
    }
  };

  // Function to fly to a specific project based on the selected project
  const handleProjectClick = (project) => {
    const { Latitude, Longitude } = project;
    const lat = parseFloat(Latitude);
    const lng = parseFloat(Longitude);
  
    if (!isNaN(lat) && !isNaN(lng)) {
      mapRef.current.flyTo(lat, lng); // Call flyTo on map instance
    }
  };
  

  return (
    <>
      {/* Sidebar (Offcanvas) */}
      <Offcanvas show={show} onHide={handleToggle} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Project Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Category buttons */}
          <div className={styles.categoryButtons}>
            <Button
              variant={activeCategory === 'Art-Based Projects' ? 'primary' : 'secondary'}
              onClick={() => handleCategoryClick('Art-Based Projects')}
            >
              Art-Based Projects
            </Button>
            <Button
              variant={activeCategory === 'Research Projects' ? 'primary' : 'secondary'}
              onClick={() => handleCategoryClick('Research Projects')}
            >
              Research Projects
            </Button>
            <Button
              variant={activeCategory === 'Education and Community Outreach' ? 'primary' : 'secondary'}
              onClick={() => handleCategoryClick('Education and Community Outreach')}
            >
              Education and Community Outreach
            </Button>
            <Button
              variant={activeCategory === '' ? 'primary' : 'secondary'}
              onClick={() => handleCategoryClick('')}
            >
              All Projects
            </Button>
          </div>

          {/* Display filtered projects */}
          <div>
            <h5>{activeCategory ? `${activeCategory} Projects` : 'All Projects'}</h5>
            {filteredProjects.length > 0 ? (
              <ul>
                {filteredProjects.map((project, index) => {
                  const lat = parseFloat(project.Latitude);
                  const lng = parseFloat(project.Longitude);
                  return (
                    <li
                      key={index}
                      onClick={() => handleProjectClick(lat, lng)} // Trigger flyTo when clicked
                    >
                      <strong>{project['Project Name']}</strong>
                      <br />
                      {project['DescriptionShort']}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No projects to display</p>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Button to open/close sidebar */}
      <Button
        variant="primary"
        onClick={handleToggle}
        className={`${styles.sidebarButton} ${show ? styles.hidden : ''}`}
      >
        {show ? '' : 'Open Sidebar'}
      </Button>
    </>
  );
};

export default Sidebar;
