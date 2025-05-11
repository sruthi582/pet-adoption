import React, { useState } from 'react';
import ShelterCard from '../components/ShelterCard'; // Import the ShelterCard component
import './Shelters.css'; // Correct path depending on your file structure

// Import the images
import shelter1 from '../assets/shelter1.png';
import shelter2 from '../assets/shelter2.png';
import shelter3 from '../assets/shelter3.png';
import shelter4 from '../assets/shelter4.png';
import shelter5 from '../assets/shelter5.png';

const sheltersData = [
  { name: 'Sunny Shelter', location: 'New York, NY', description: 'A place full of love for animals in need.', image: shelter1 },
  { name: 'Happy Paws Shelter', location: 'Los Angeles, CA', description: 'Dedicated to the care and well-being of pets.', image: shelter2 },
  { name: 'Safe Haven Shelter', location: 'Chicago, IL', description: 'A safe space for pets to find their forever homes.', image: shelter3 },
  { name: 'Hopeful Hearts Shelter', location: 'Dallas, TX', description: 'A loving shelter for stray animals.', image: shelter4 },
  { name: 'Animal Rescue Shelter', location: 'Miami, FL', description: 'Providing shelter for abandoned pets.', image: shelter5 },
];

function Shelters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const handleOpenModal = (shelter) => {
    setSelectedShelter(shelter);
    setIsModalOpen(true); // Open modal when a shelter is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedShelter(null); // Reset selected shelter when closing the modal
  };

  return (
    <div className="shelters-container">
      <h1 className="shelters-header">Shelters Near You</h1>
      <p className="shelters-description">
        Find shelters available for adoption or volunteering opportunities!
      </p>

      <div className="shelters-list">
        {sheltersData.map((shelter, index) => (
          <div key={index} className="shelter-card">
            <ShelterCard shelter={shelter} onClick={() => handleOpenModal(shelter)} />
          </div>
        ))}
      </div>

      {/* Modal for shelter details */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal-btn" onClick={handleCloseModal}>X</button>
            <h2>{selectedShelter.name}</h2>
            <img src={selectedShelter.image} alt={selectedShelter.name} />
            <p><strong>Location:</strong> {selectedShelter.location}</p>
            <p><strong>Description:</strong> {selectedShelter.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shelters;
