import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnimalList from "../components/AnimalList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./Auth.css";

const AllAnimals = ({ userInfo }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isBasicMode, setIsBasicMode] = useState(true);
  const [searchPets, setSearchPets] = useState(false);

  const [savedPets, setSavedPets] = useState();
  const [allPets, setAllPets] = useState(savedPets);
  // const [animals, setAnimals] = useState(savedPets)
  const [dogsOnly, setDogsOnly] = useState(false);
  

  // const allAnimalTypes = [...savedPets.map(pet => pet.type)];

  // const animalStatus = () => {
  //   setAllPets((savedPetsToDisplay) => savedPets.filter((animal) => animal.status.included("Adopted"))
  // )}

  const [petType, setPetType] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [selected, setSelected] = useState();

  // const testSteeven = (e) => {
  //   setPetType(e.target.value);
  //   setIsClicked(!isClicked);
  // };

  // useEffect(() => {

  //   const togglePets = () => {
  //     if (isClicked && petType === "cats") {
  //       setAllPets((savedPetsToDisplay) =>
  //       savedPets.filter((animal) => animal.type.includes("Cat"))
  //       //do your query to filter by cats
  //       // console.log("Cats - Is Clicked");
  //        ) } else if (isClicked && petType === "dogs") {
  //       //do your query to filter by dogs
  //       setAllPets((savedPetsToDisplay) =>
  //   savedPets.filter((animal) => animal.type.includes("Dog"))
  //       // console.log("Dogs - Is Clicked");
  //       )} else {
  //       // reset / update your pet type to whatever works for your query
  //       //query to show both cats & dogs
  //       console.log("Reset - Not Clicked");
  //     }
  //   };
  //   togglePets();
  // }, [isClicked, petType])

  // const dogToggle = (type) => {
  //   setSavedPets((savedPetsToDisplay) =>
  //     savedPets.filter((animal) => animal.type.includes("Dog"))
  //   );
  // };

  // const catToggle = (type) => {
  //   setSavedPets((savedPetsToDisplay) =>
  //     savedPets.filter((animal) => animal.type.includes("Cat"))
  //   );
  // };

  const filterPetsByTypeDog = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:8080/pet`);

      setSavedPets(responseData.pets.filter((pet) => pet.type === "Dog"));
    } catch (err) {}
  };

  const filterPetsByTypeCat = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:8080/pet`);

      setSavedPets(responseData.pets.filter((pet) => pet.type === "Cat"));
    } catch (err) {}
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const responseData = await sendRequest("http://localhost:8080/pet");
        setSavedPets(responseData.pets);

        console.log("getallpets", responseData);
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
    setIsBasicMode(!isBasicMode);
  };
  console.log("savedPets", savedPets);

  const filterPetsByStatus = async () => {
    try {
      const responseData = await sendRequest(`http://localhost:8080/pet`);

      setSavedPets(
        responseData.pets.filter((pet) => pet.status === "Available")
      );
      setSelected(selected);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h1 className="center">ALL OUR ANIMALS BELONG HERE</h1>
      <div className="center">
        {isBasicMode && (
          <>
            <Button onClick={filterPetsByTypeDog}>DOGS</Button>
            <Button onClick={filterPetsByTypeCat}>CATS</Button>
          </>
        )}

        <Button inverse onClick={switchModeHandler}>
          {!isBasicMode ? "Basic Search" : "ADVANCED SEARCH"}
        </Button>
        {!isBasicMode && (
          <div className="searchControl">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Animal Status" />
              </Form.Group>
            </Form>
            <Form.Select
              aria-label="Default select example"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="Available">Available</option>
              <option value="Fostered">Fostered</option>
              <option value="Adopted">Adopted</option>
            </Form.Select>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control type="text" placeholder="Color" />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control type="text" placeholder="Animal Weight" />
              </Form.Group>
            </Form>
            <Button inverse onClick={filterPetsByStatus}>
              Search
            </Button>
            <Button inverse onClick={switchModeHandler}>
              {!isBasicMode ? "Go Back to Basic Search" : "ADVANCED SEARCH"}
            </Button>
          </div>
        )}
      </div>
      {/* {savedPets.map((animal) => {
        <AnimalList animal={animal}/>
      })} */}
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
