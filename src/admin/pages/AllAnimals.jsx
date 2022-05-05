import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnimalList from "../components/AnimalList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import {
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Button from "../../shared/components/FormElements/Button";

const AllAnimals = ({ userInfo }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isBasicMode, setIsBasicMode] = useState(true);

  const [savedPets, setSavedPets] = useState();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const responseData = await sendRequest("http://localhost:8080/pet");
        setSavedPets(responseData.pets);
        console.log("getallpets", responseData.pets);
      } catch (err) {}
    };

    fetchPets();
  }, [sendRequest]);

  const petDeleteHandler = (deletedPetId) => {
    setSavedPets((prevPets) =>
      prevPets.filter((pet) => pet.id !== deletedPetId)
    );
  };

  const switchModeHandler = () => {
    setIsBasicMode(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h1>ALL OUR ANIMALS BELONG HERE</h1>
      {/* <React.Fragment>
              <Input
                element="input"
                id="firstname"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lastname"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="phonenumber"
                type="number"
                label="Phone Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid phone number."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Passwords need to match"
                onInput={inputHandler}
              />
            </React.Fragment> */}
      
      
      {!isLoading && savedPets && (
        <AnimalList
          animals={savedPets}
          userInfo={userInfo}
          onDeletePet={petDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default AllAnimals;
