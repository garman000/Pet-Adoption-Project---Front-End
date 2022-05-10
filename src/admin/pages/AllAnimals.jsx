import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnimalList from "../components/AnimalList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

import "./Auth.css";
import PetItem from "../../pets/components/PetItem";
import AnimalItem from "../components/AnimalItem";

const AllAnimals = ({ userInfo }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isBasicMode, setIsBasicMode] = useState(true);
  // const [searchPets, setSearchPets] = useState(false);

  const [savedPets, setSavedPets] = useState();
  const [allPets, setAllPets] = useState(savedPets);
  // const [animals, setAnimals] = useState(savedPets)
  const [dogsOnly, setDogsOnly] = useState(false);

  const [loadedPets, setLoadedPets] = useState([]);
  const [petType, setPetType] = useState("");
  const [petStatus, setPetStatus] = useState("");
  const [petHeight, setPetHeight] = useState("");
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState("");

  const searchPets = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:8080/pet/search?type=${petType}&status=${petStatus}&height=${petHeight}&name=${petName}&weight=${petWeight}`
      );
      setLoadedPets(responseData.pets);
      console.log("query test", responseData.pets);
    } catch (err) {}
  };

  // const allAnimalTypes = [...savedPets.map(pet => pet.type)];

  // const animalStatus = () => {
  //   setAllPets((savedPetsToDisplay) => savedPets.filter((animal) => animal.status.included("Adopted"))
  // )}

  // const [petType, setPetType] = useState();
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

  // function showAllPetsToggle() {
  //   setSavedPets(savedPets)
  // }

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
      <Container>
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
              <Button onClick={""}>SHOW ALL</Button>
            </>
          )}

          <Button inverse onClick={switchModeHandler}>
            {!isBasicMode ? "Basic Search" : "ADVANCED SEARCH"}
          </Button>
          {!isBasicMode && (
            <div className="searchControl">
              <form>
                <select
                  className="searchbox__input"
                  placeholder={"placeholder"}
                  type="text"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option value="">Filter by Type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
                <select
                  className="searchbox__input"
                  placeholder={"placeholder"}
                  type="text"
                  value={petStatus}
                  onChange={(e) => setPetStatus(e.target.value)}
                >
                  <option value="">Filter By Status</option>
                  <option value="Adopted">Adopted</option>
                  <option value="Fostered">Fostered</option>
                  <option value="Available">Available</option>
                </select>

                <input
                  className="searchbox__input"
                  type="text"
                  placeholder="Search by Name"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
                <input
                  className="searchbox__input"
                  placeholder={"Search by Height"}
                  type="text"
                  value={petHeight}
                  onChange={(e) => setPetHeight(e.target.value)}
                />
                <input
                  className="searchbox__input"
                  placeholder={"Search by Weight"}
                  type="text"
                  value={petWeight}
                  onChange={(e) => setPetWeight(e.target.value)}
                />

                <Button type="button" onClick={searchPets}>
                  Search
                </Button>
              </form>

              <ListGroup>
                {loadedPets &&
                  loadedPets.map((pet) => (
                    <AnimalItem
                      key={pet.id}
                      id={pet.id}
                      breed={pet.breed}
                      age={pet.age}
                      image={pet.image}
                      bio={pet.bio}
                      name={pet.name}
                      savedby={pet.savedby}
                    />
                  ))}
              </ListGroup>
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
      </Container>
    </React.Fragment>
  );
};

export default AllAnimals;
