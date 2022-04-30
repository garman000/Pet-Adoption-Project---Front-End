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
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            picture={user.picture}
            firstname={user.firstname}
            lastname={user.lastname}
            petCount={user.pets.length}
          />
        ))}
      </ul>
    </>
  );
}

export default UserList;
