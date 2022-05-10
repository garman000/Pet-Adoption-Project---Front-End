import React, { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import bootstrap from 'bootstrap';
import PetList from "../components/PetList.jsx";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.jsx";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.jsx";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.jsx";
import "./NewPets.css";
import AnimalList from "../../admin/components/AnimalList.jsx";

const UserPets = () => {
  const [loadedPets, setLoadedPets] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/pet/user/${userId}`
        );
        console.log("userpets", responseData);
        setLoadedPets(responseData.pets);
      } catch (err) {}
    };

    fetchPets();
  }, [sendRequest, userId]);
  return (
    // <Container>
    <React.Fragment>
      <div>
        <h1 className="d-flex justify-content-center">My Pets</h1>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPets && (
          <div className="testerr">
            <PetList items={loadedPets} />
          </div>
        )}
      </div>
    </React.Fragment>
    // </Container>
  );
};

export default UserPets;
