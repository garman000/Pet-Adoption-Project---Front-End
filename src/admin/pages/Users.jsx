import React from "react";
import { Container } from "react-bootstrap";
import bootstrap from "bootstrap";

import UserList from "../components/UserList";
import Card from "../../shared/components/UIElements/Card";
import "../components/UserList.css";
import Homepage from "./Homepage";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      firstname: "Steven",
      secondname: "Garman",
      age: "32",
      from: "manchester",
      pets: 7,
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
  ];

  return (
    <Container>
      <h1 className="d-flex justify-content-center">Users</h1>
      <div className="userCard">
           <UserList items={USERS} />
      </div>
    </Container>
  );
};

export default Users;
