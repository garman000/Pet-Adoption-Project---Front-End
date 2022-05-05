import React, { useCallback, useReducer, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPets.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";


const NewPets = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); 
  const [formState, inputHandler] = useForm({
    name: {
      value: "",
      isValid: false
    },
    type: {
      value: "",
      isValid: false,
    },
    breed: {
      value: "",
      isValid: false,
    },
    weight: {
      value: "",
      isValid: false,
    },
    height: {
      value: "",
      isValid: false,
    },
    color: {
      value: "",
      isValid: false,
    },
    dietaryrequirements: {
      value: "",
      isValid: false,
    },
    hypoallergenic: {
      value: "",
      isValid: false,
    },
    bio: {
      value: "",
      isValid: false,
    },
    picture: {
      value: "",
      isValid: false,
    },
    status: {
      value: "",
      isValid: false,
    },
  
  
  }, false)
  
 

  const petSubmitHandler = async (event) => {
    event.preventDefault();
 
    try {
      await sendRequest('http://localhost:8080/pet', 'POST', JSON.stringify({
         type: formState.inputs.type.value,
         name: formState.inputs.name.value,
         breed: formState.inputs.breed.value,
         weight: formState.inputs.weight.value,
         height: formState.inputs.height.value,
         color: formState.inputs.color.value,
         dietaryrequirements: formState.inputs.dietaryrequirements.value,
         hypoallergenic: formState.inputs.hypoallergenic.value,
         bio: formState.inputs.bio.value,
         picture: formState.inputs.picture.value,
         status: formState.inputs.status.value,
         savedby: auth.userId
   
       }), 
       { 'Content-Type': 'application/json' }
    );
    navigate('/allanimals')
      
    } catch (err) {}


  };
  return (
    <>
      <div>
        <h1>NEW PETS</h1>
      </div>
<React.Fragment>
<ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={petSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="type"
          element="input"
          type="text"
          label="Type"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter aniamls name."
          onInput={inputHandler}
        />
        <Input
          id="breed"
          element="input"
          type="text"
          label="Breed"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid breed"
          onInput={inputHandler}
        />
        <Input
          id="weight"
          element="input"
          type="text"
          label="Weight"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid weight"
          onInput={inputHandler}
        />
        <Input
          id="height"
          element="input"
          type="text"
          label="Height"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid height"
          onInput={inputHandler}
        />{" "}
        <Input
          id="color"
          element="input"
          type="text"
          label="Color"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid color"
          onInput={inputHandler}
        />{" "}
        <Input
          id="dietaryrequirements"
          element="input"
          type="text"
          label="Dietary Requirements"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter any dietary restrictions animal may have"
          onInput={inputHandler}
        />
        <Input
          id="hypoallergenic"
          element="input"
          type="text"
          label="Allergies"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Hypoallergenic?"
          onInput={inputHandler}
        />
        <Input
          id="bio"
          element="input"
          type="text"
          label="Bio"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Add bio"
          onInput={inputHandler}
        />
        <Input
          id="picture"
          element=""
          type=""
          label="Picture"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Animal Status"
          onInput={inputHandler}
        />
        <Input
          id="status"
          element="input"
          type="text"
          label="Status"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Animal Status"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Pets
        </Button>
      </form>
      </React.Fragment>
    </>
  );
};

export default NewPets;
