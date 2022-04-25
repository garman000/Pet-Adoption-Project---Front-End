import React from "react";
import { Link } from "react-router-dom";
import "./UserItem.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
          {/* <Card> */}
          <Link to={`/${props.id}/mypets`}>
      {/* <div className="test1"> */}
        <div className="user-item__image">
          <Avatar image={props.image} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.firstname} {props.secondname}</h2>
          <h3>Age: {props.age}</h3>
          <h3>
            {props.petCount} {props.petCount === 1 ? "Pet" : "Pets"}
          </h3>
          </div>
        {/* </div> */}
        </Link>
        {/* </Card> */}
      </div>
    </li>
  );
}

export default UserItem;
