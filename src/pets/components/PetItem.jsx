import React from "react";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./PetItem.css";

const PetItem = (props) => {
  return (
    <Card>
      <li className="user-item">
        <div className="user-item__content">
            <div className="test1">
          <div className="user-item__image test2">
            <img className="petImage" src={props.image} alt={props.name}/>
          </div>
          <div className="user-item__info test3">
            <h1> {props.name} </h1>
            <h3>Age: {props.age}</h3>
           <p>Bio: {props.bio} </p>
          </div>
          </div>
        </div>
      </li>
    </Card>
  );
};

export default PetItem;
