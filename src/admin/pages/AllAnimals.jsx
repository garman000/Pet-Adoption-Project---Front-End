import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AnimalList from "../components/AnimalList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const AllAnimals = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [savedPets, setSavedPets] = useState();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const responseData = await sendRequest("http://localhost:8080/pet");
        setSavedPets(responseData.pets);
        console.log("test", responseData.pets);
      } catch (err) {}
    };

    fetchPets();
  }, [sendRequest]);

const petDeleteHandler = (deletedPetId) => {
  setSavedPets(prevPets => prevPets.filter(pet => pet.id !== deletedPetId ))
}

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h1>ALL OUR ANIMALS BELONG HERE</h1>

      {!isLoading && savedPets && <AnimalList animals={savedPets} onDeletePet={petDeleteHandler} />}
    </React.Fragment>
  );
};

export default AllAnimals;
