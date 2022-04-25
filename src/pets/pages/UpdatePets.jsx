import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

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

const UpdatePets = () => {
  const petsId = useParams().petsId;

  const identifiedPets = PETS.find((p) => p.id === petsId);

  if (!identifiedPets) {
    return (
      <div className="center">
        <h2>COULD NOT FIND PETS</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Name"
        validator={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name"
        onInput={() => {}}
        value={identifiedPets.name}
        valid={true}
      />
      <Button type="submit" diabled={true}>UPDATE PET</Button>
    </form>
  );
};

export default UpdatePets;
