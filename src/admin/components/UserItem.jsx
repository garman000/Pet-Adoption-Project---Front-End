import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Link to={`/${props.id}/mypets`}>
        {/* <Card> */}
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>
              {props.firstname} {props.lastname}
            </h2>
            <h3>{props.email}</h3>
            <h3>
              {props.petCount} {props.petCount === 1 ? "Pet" : "Pets"}
            </h3>
          </div>
          {/* </Card> */}
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
