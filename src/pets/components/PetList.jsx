import React from "react";
import PetItem from "./PetItem";

import "./PetList.css";

const PetList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Pets Found</h2>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((pet) => (
        <PetItem key={pet.id} id={pet.id} breed={pet.breed} age={pet.age} image={pet.image} bio={pet.bio} name={pet.name} />
      ))}
    </ul>
  );
};

export default PetList;
