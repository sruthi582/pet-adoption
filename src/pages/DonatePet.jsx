import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DonatePet.css';

function DonatePet() {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [donatedPets, setDonatedPets] = useState([]);

  const navigate = useNavigate();

  // Convert image to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle form submission (pet donation)
  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = '';
    if (imageFile) {
      base64Image = await convertToBase64(imageFile);
    }

    const newPet = { 
      name, 
      image: base64Image, 
      description, 
      age, 
      breed, 
      donationStatus: 'Not Adopted',
      donor: 'user123' // You should replace this with an actual user identifier
    };

    const storedPets = JSON.parse(localStorage.getItem('donatedPets')) || [];
    const updatedPets = [...storedPets, newPet];
    localStorage.setItem('donatedPets', JSON.stringify(updatedPets));

    alert(`${name} has been added for adoption!`);
    navigate('/pets');
  };

  // Fetch donated pets from local storage when component mounts
  useEffect(() => {
    const storedPets = JSON.parse(localStorage.getItem('donatedPets')) || [];
    setDonatedPets(storedPets);
  }, []);

  // Handle withdrawal (deletion) of donated pets
  const handleWithdraw = (petName) => {
    const updatedPets = donatedPets.filter(pet => pet.name !== petName);
    setDonatedPets(updatedPets);
    localStorage.setItem('donatedPets', JSON.stringify(updatedPets)); // Update localStorage
  };

  return (
    <div className="donate-form">
      <h2>Donate a Pet</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Pet Name" required />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age (e.g., Puppy, Adult)" required />
        <input value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" required />
        <button type="submit">Submit</button>
      </form>

      <h2>Your Donated Pets</h2>
      <div className="donated-pets-list">
        {donatedPets.map((pet, index) => (
          <div key={index} className="donated-pet-card">
            <img src={pet.image} alt={pet.name} />
            <div>
              <h3>{pet.name}</h3>
              <p>{pet.description}</p>
              <p>Age: {pet.age}</p>
              <p>Breed: {pet.breed}</p>
            </div>
            <button onClick={() => handleWithdraw(pet.name)}>Withdraw</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonatePet;
