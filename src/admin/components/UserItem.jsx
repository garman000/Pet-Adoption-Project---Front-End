import React from "react";
import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";

function UserItem(props) {
  return (
    <li className="user-item">
      <div className="user-item__content">
      <div className="test1">
        <div className="user-item__image">
          <Avatar image={props.image} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.firstname}{props.secondname}</h2>
          <h3>Age: {props.age}</h3>
          <h3>
            {props.petCount} {props.petCount === 1 ? "Pet" : "Pets"}
          </h3>
          </div>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
