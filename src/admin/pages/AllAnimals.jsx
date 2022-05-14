import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnimalList from "../components/AnimalList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import { Container, ListGroup } from "react-bootstrap";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./Auth.css";
import PetItem from "../../pets/components/PetItem";
import AnimalItem from "../components/AnimalItem";

const AllAnimals = ({ userInfo }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isBasicMode, setIsBasicMode] = useState(true);
  const [savedPets, setSavedPets] = useState();
  const [loadedPets, setLoadedPets] = useState([]);
  const [petType, setPetType] = useState("");
  const [petStatus, setPetStatus] = useState("");
  const [petHeight, setPetHeight] = useState("");
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState("");


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const responseData = await sendRequest("http://localhost:8080/pet");
        setSavedPets(responseData.pets);
      } catch (err) {}
    };

    fetchPets();
  }, [sendRequest]);

  const searchPets = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:8080/pet/search?type=${petType}&status=${petStatus}&height=${petHeight}&name=${petName}&weight=${petWeight}`
      );
      setLoadedPets(responseData.pets);
    } catch (err) {}
  };

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

  const petDeleteHandler = (deletedPetId) => {
    setSavedPets((prevPets) =>
      prevPets.filter((pet) => pet.id !== deletedPetId)
    );
  };

  const switchModeHandler = () => {
    setIsBasicMode(!isBasicMode);
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
                <Button inverse onClick={switchModeHandler}>
                  {!isBasicMode ? "Basic Search" : "ADVANCED SEARCH"}
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
                      owner={pet.owner}
                    />
                  ))}
              </ListGroup>
            </div>
          )}
        </div>

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
