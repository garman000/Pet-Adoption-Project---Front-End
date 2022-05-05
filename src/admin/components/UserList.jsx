import React from "react";
import "./UserList.css";
// import { Container, Card } from "react-bootstrap";
import bootstrap from "bootstrap";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import Users from "../pages/Users";
// import Modal from "../../shared/components/UIElements/Modal";

function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      
      <ul className="users-list">
        {props.items.map((users) => (
          <UserItem
            key={users.id}
            id={users.id}
            picture={users.image}
            firstname={users.firstname}
            lastname={users.lastname}
            petCount={users.pets.length}
            email={users.email}
            bio={users.bio}
          />
        ))}
      </ul>
    </>
  );
}

export default UserList;
