import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./NewPets.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};
const NewPets = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      Name: {
        value: "",
        isValid: false,
      },
      Breed: {
        value: "",
        isValid: false,
      },
      Age: {
        value: "",
        isValid: false,
      },
      Weight: {
        value: "",
        isValid: false,
      },
      Height: {
        value: "",
        isValid: false,
      },
      Colour: {
        value: "",
        isValid: false,
      },
      DietaryRestrictions: {
        value: "",
        isValid: false,
      },
    
    },
    isValid: false,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const petSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //send to backend
  };
  return (
    <>
      <div>
        <h1>NEW PETS</h1>
      </div>

      <form className="place-form" onSubmit={petSubmitHandler}>
        <Input
          id="Name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="Breed"
          element="input"
          type="text"
          label="Breed"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid breed"
          onInput={inputHandler}
        />
        <Input
          id="Age"
          element="input"
          type="text"
          label="Age"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid age"
          onInput={inputHandler}
        />
        <Input
          id="Weight"
          element="input"
          type="text"
          label="Weight"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid weight"
          onInput={inputHandler}
        />
        <Input
          id="Height"
          element="input"
          type="text"
          label="Height"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid height"
          onInput={inputHandler}
        />{" "}
        <Input
          id="Colour"
          element="input"
          type="text"
          label="Colour"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid colour"
          onInput={inputHandler}
        />{" "}
        <Input
          id="DietaryRestrictions"
          element="input"
          type="text"
          label="Dietary Restrictions"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter any dietary restrictions animal may have"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add pets
        </Button>
      </form>
    </>
  );
};

export default NewPets;
