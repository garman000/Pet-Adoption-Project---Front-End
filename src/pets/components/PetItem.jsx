import React from "react";

import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./PetItem.css";


const PetItem = (props) => {
  return (
      <li className="user-item">
          <Card className="place-item__content">
        <div className="user-item__content">
            <div className="place-item__actions">
            <h1> {props.breed}</h1>
            </div>
          <div className="test1">
            <div className="user-item__image test2">
              <img className="petImage" src={props.image} alt={props.name} />
            </div>
            <div className="user-item__info test3">
              <h1> {props.name} </h1>
              <h3>Age:{props.age}</h3>
              <p>{props.bio} </p>
            </div>
            <div className="place-item__actions">
                <Button danger>EDIT PET</Button> 
                <Button danger>REMOVE PET</Button> 
            </div>
          </div>
        </div>
    </Card>
      </li>
  );
};

export default PetItem;
