import React from "react";
import "./UserList.css";
import AnimalItem from "./AnimalItem";
import Card from "../../shared/components/UIElements/Card";

const AnimalList = (props) => {
  if (props.animals.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <>
        <ul className="users-list">
          {props.animals.map((pets) => (
            <AnimalItem
              key={pets.id}
              id={pets.id}
              type={pets.type}
              name={pets.name}
              bio={pets.bio}
              status={pets.status}
              picture={pets.picture}
              breed={pets.breed}
              color={pets.color}
              onDelete={props.onDeletePet}

             
            />
          ))}
        </ul>
      </>
    </div>
  );
};

export default AnimalList;
