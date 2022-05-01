import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "../../pets/pages/NewPets.css";

const DUMMY_USER = [
  {
    id: "p1",
    firstname: "Michael",
    lastname: "Carrick",
    email: "carrick@mufc.com",
    password: "111111",
    creator: "u1",
  },
  {
    id: "p2",
    firstname: "Dimitar",
    lastname: "Berbatov",
    email: "manutd",
    password: "111111",
    creator: "u2",
  },
];

const UpdateUser = () => {
  const userId = useParams().userId;

  const identifiedUser = DUMMY_USER.find((p) => p.id === userId);

  const [formState, inputHandler] = useForm({
    firstname: {
      value: identifiedUser.firstname,
      isValid: true,
    },
    lastname: {
      value: identifiedUser.lastname,
      isValid: true,
    },
    email: {
      value: identifiedUser.email,
      isValid: true,
    },
    password: {
      value: identifiedUser.password,
      isValid: true,
    },
  });

  const userUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedUser) {
    return (
      <div className="center">
        <h2>Could not find User!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={userUpdateSubmitHandler}>
      <Input
        id="firstname"
        element="input"
        type="text"
        label="First Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.firstname.value}
        initialValid={formState.inputs.firstname.isValid}
      />

      <Input
        id="lastname"
        element="input"
        label="lastname"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.lastname.value}
        initialValid={formState.inputs.lastname.isValid}
      />
      <Input
        id="email"
        element="input"
        label="Email"
        type="email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={formState.inputs.email.value}
        initialValid={formState.inputs.email.isValid}
      />
      <Input
        id="password"
        element="input"
        label="Password"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={formState.inputs.password.value}
        initialValid={formState.inputs.password.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE USER
      </Button>
    </form>
  );
};

export default UpdateUser;
