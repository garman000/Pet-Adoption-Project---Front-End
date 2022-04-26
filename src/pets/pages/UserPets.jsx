import React from "react";
// import { Container } from "react-bootstrap";
// import bootstrap from 'bootstrap';
import PetList from "../components/PetList.jsx";
import { useParams } from "react-router-dom";

const PETS = [
  {
    id: "u1",
    name: "Casper",
    breed: "Dog",
    age: "3",
    image:
      "http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg",
    bio: "Casper LOVES kids!",
    savedby: "u1",
  },
  {
    id: "u1",
    name: "Casper",
    breed: "Dog",
    age: "3",
    image:
      "http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg",
    bio: "Casper LOVES kids!",
    savedby: "u2",
  },
  {
    id: "u1",
    name: "Casper",
    breed: "Dog",
    age: "3",
    image:
      "http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg",
    bio: "Casper LOVES kids!",
    savedby: "u2",
  },
];
const UserPets = () => {
  const userId = useParams().userId;
  const loadedPets = PETS.filter(pet => pet.savedby === userId)
  return (
    // <Container>
    <div>
      <h1 className='d-flex justify-content-center'>My Pets</h1>
      <PetList items={loadedPets} />
    </div>
    // </Container>
    // <div><h1>new pets work</h1></div>
  );
};

export default UserPets;
