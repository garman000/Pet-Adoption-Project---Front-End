import React from "react";
import "./UserList.css";
import { Container, Card } from "react-bootstrap";
import bootstrap from "bootstrap";
import UserItem from "./UserItem";
import Users from "../pages/Users";
import Modal from "../../shared/components/UIElements/Modal";

function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <div>
          <h2>No users found.</h2>
        </div>
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
            age={user.age}
            image={user.image}
            from={user.from}
            firstname={user.firstname}
            secondname={user.secondname}
            petCount={user.pets}
          />
        ))}
      </ul>
    </>
  );
}

export default UserList;
