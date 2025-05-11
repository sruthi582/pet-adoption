import React, { useEffect, useState } from 'react';
import './Pets.css';
import pet1 from '../assets/pet1.png';
import pet2 from '../assets/pet2.png';
import pet3 from '../assets/pet3.png';
import pet4 from '../assets/pet4.png';
import pet5 from '../assets/pet5.png';
import pet6 from '../assets/pet6.png';

const defaultPetsData = [
  { name: 'Buddy', image: pet1, description: 'A cheerful puppy who loves to play!', age: 'Puppy', breed: 'Golden Retriever' },
  { name: 'Whiskers', image: pet2, description: 'Loves cuddles and cozy nap spots.', age: 'Adult', breed: 'Cat' },
  { name: 'Rex', image: pet3, description: 'A loyal dog looking for a forever home.', age: 'Adult', breed: 'German Shepherd' },
  { name: 'Misty', image: pet4, description: 'Calm, quiet, and gentle-hearted.', age: 'Senior', breed: 'Shih Tzu' },
  { name: 'Simba', image: pet5, description: 'Curious explorer and always alert.', age: 'Puppy', breed: 'Siamese' },
  { name: 'Luna', image: pet6, description: 'Loves moonlit walks and treats.', age: 'Adult', breed: 'Labrador' },
];

function Pets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleAdopt = (pet) => {
    setSelectedPet(pet); // Show the modal with pet details
  };

  const handleCloseModal = () => {
    setSelectedPet(null); // Close the modal
  };

  useEffect(() => {
    const donatedPets = JSON.parse(localStorage.getItem('donatedPets')) || [];
    setPets([...defaultPetsData, ...donatedPets]);
  }, []);

  return (
    <div className="pets-container">
      <div className="pets-header">
        <h1>Find Your Perfect Pet</h1>
        <p className="description">Explore various pets available for adoption!</p>
      </div>

      <div className="pets-list">
        <h2>Available Pets</h2>
        <div className="pet-cards">
          {pets.map((pet, index) => (
            <div key={index} className="pet-card">
              <img className="pet-image" src={pet.image} alt={pet.name} />
              <div className="pet-name">{pet.name}</div>
              <div className="pet-description">{pet.description}</div>
              <div className="pet-details">
                <p>Age: {pet.age}</p>
                <p>Breed: {pet.breed}</p>
              </div>
              <button
                className="adopt-button"
                onClick={() => handleAdopt(pet)} // Open modal on click
              >
                Adopt
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adoption Info */}
      {selectedPet && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thank you for adopting {selectedPet.name}!</h3>
            <p>📞 Contact: <strong>+91 698879371248</strong></p>
            <p>📍 Location: <strong>KL University, Vijayawada</strong></p>
            <p>🐾 Please visit the adoption center to complete the process.</p>
            <button className="close-modal-btn" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pets;
