import React from "react";
import { Container } from "react-bootstrap";
import Card from "../../shared/components/UIElements/Card";
import PetItem from "./PetItem";
import bootstrap from "bootstrap";

import "./PetList.css";

const PetList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Pets Found</h2>
          <p>Maybe its time to adopt?</p>
          <div className="d-flex">
          <button>Adopt</button>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <Container>
      <ul className="place-list d-flex">
        {props.items.map((pet) => (
          <PetItem
            key={pet.id}
            id={pet.id}
            breed={pet.breed}
            age={pet.age}
            image={pet.image}
            bio={pet.bio}
            name={pet.name}
          />
        ))}
      </ul>
    </Container>
  );
};

export default PetList;
