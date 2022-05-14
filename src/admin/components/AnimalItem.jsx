import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMore from "react-show-more-button/dist/module";

import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";

import "./UserItem.css";

const AnimalItem = (props) => {
  const auth = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);
  const { userId, userInfo } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { id, savedby, status } = props;

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:8080/pet/${id}`, "DELETE");
      props.onDelete(id);
    } catch (err) {}
  };
 
  const savePet = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:8080/users/${userId}`
      );
      const userPetsArray = responseData.user.pets;
      if (userPetsArray.includes(props.id)) {
       alert("Pet has been saved!");
      } else if (props.status === "Available" || "Fostered") {
        try {
          responseData = await sendRequest(
            `http://localhost:8080/pet/${userId}/save`,
            "POST",
            JSON.stringify({
              _id: props.id,
              userId: userId,
            }),
            {
              "Content-Type": "application/json",
            }
          );
        } catch (err) {}
        alert("Pet Saved");
        navigate(`/${auth.userId}/mypets`);
    }} catch (err) {}
  };

  const fosterPet = async (e) => {
    e.preventDefault();
    if (props.status === "Available" ) {
      savePet();
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/pet/${id}/fostered`,
          "POST",
          JSON.stringify({
            userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate(`/${auth.userId}/mypets`);
        alert("Pet has been fostered");
      } catch (err) {}
    } else {
      alert("Can only foster available pets");
    }
  };

  const adoptPet = async (e) => {
    e.preventDefault();
    if (props.status === "Available" || "Fostered") {
     
      savePet();
      
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/pet/${userId}/adopted`,
          "POST",
          JSON.stringify({
            userId,
            status: "Adopted"
          }),
          {
            "Content-Type": "application/json",
          }
        );
       
        navigate(`/${auth.userId}/mypets`);
        alert("Pet has been adopted");
      } catch (err) {}
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/pet/${userId}/update`,
          "PUT",
          JSON.stringify({
            status: "Adopted",
          }),
          {
            "Content-Type": "application/json",
            }
        );
        alert("Pet adopted!");
    } catch (err) {}
      alert("Can only adopt available pets");
    }
  };

  const returnFosteredPet = async (e) => {
  
    e.preventDefault();
  if( props.status === "Adopted" || "Fostered" ) {
  

  try{
    const responseData = await sendRequest(`http://localhost:8080/pet/${id}/return`, 'DELETE',
    JSON.stringify({
      userId,
      status: "Available"
    }),
    
    {
      'Content-Type': "application/json"
    })
 
    navigate(`/${auth.userId}/mypets`)
    alert('Youre animal has been returned!')
  } catch(err) {}
  } else {
  alert("Can only foster available pets")
  }
  
  }
  const removeAdoptedPet = async (e) => {
  e.preventDefault();
  if( props.status === "Adopted" || "Fostered" ) {
  
 
  try{
    const responseData = await sendRequest(`http://localhost:8080/pet/${id}/return`, 'DELETE',
    JSON.stringify({
      userId,
      status: "Available"
    }),
    
    {
      'Content-Type': "application/json"
    })
   
    navigate(`/${auth.userId}/mypets`)
    alert('Youre animal has been returned!')
  } catch(err) {}
  } else {
  alert("Can only foster available pets")
  }
  
  }

  const removePet = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:8080/users/${userId}`
      );
      const userPetsArray = responseData.user.pets;
      try {
        responseData = await sendRequest(
          `http://localhost:8080/pet/${userId}/save`,
          "DELETE",
          JSON.stringify({
            _id: props.id,
            userId: userId,
            status: "Available",
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
      alert("Removed saved pet");
      navigate("/allanimals");
    } catch (err) {}
  };
  
  const returnFoster = async (e) => {

    e.preventDefault();
    if (props.status === "Adopted" || "Fostered") {
    
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/pet/${id}/return`,
          "DELETE",
          JSON.stringify({
            userId,
            userId,
            _id: props.id,
            status: "Available",
          }),

          {
            "Content-Type": "application/json",
          }
        );
       
        // navigate(`/${auth.userId}/mypets`)
        navigate("/allanimals");

        alert("Youre animal has been returned!");
      } catch (err) {}
      } else {
      alert("Can only foster available pets")
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Close
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Remove{" "}
            </Button>
          </React.Fragment>
        }
      >
        <p>Once removed, never returned</p>
      </Modal>
      <li className="user-item">
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2 className="center">{props.name}</h2>
          <p className="center">
            <strong>Status: </strong> {props.status}
          </p>
          <ShowMore
            backgroundColor="white"
            styleButton={{
              borderRadius: "4px",
              background: "white",
              padding: "0.8rem",
              border: "1px solid #FF0055",
              color: "#FF0055",
            }}
          >
            <div className="user-item__content">
              <div className="place-item__image">
                <img className="imageControl" src={props.image} />
              </div>
              <div className="place-item__info">
                <h2 className="center">{props.type}</h2>
              </div>
            </div>
            {props.savedby}
            <p>
              <strong>Breed: </strong>
              {props.breed}
            </p>
            <p>
              <strong>Colour: </strong>
              {props.color}
            </p>
            <p>
              <strong>Bio: </strong>
              {props.bio}
            </p>
          </ShowMore>
          <div className="place-item__actions">
            {auth.isLoggedIn && (
              <div className="buttonCtl">
                <Button inverse onClick={savePet}>
                  Save
                </Button>
                {props.status === "Available" ? (
                  <>
                    <Button inverse onClick={adoptPet}>
                      Adopt
                    </Button>

                    <Button inverse onClick={fosterPet}>
                      Foster
                    </Button>
                  </>
                ) : (
                  ""
                )}
                {/* {props.status == "Adopted" && auth.userId == props.savedby ? (
                  <Button>Return Pet</Button>
                ) : (
                  ""
                )} */}
                {props.status == "Fostered" && auth.userId == props.savedby ? (
                  <Button onClick={removePet}>Return Foster</Button>
                ) : (
                  ""
                )}

                {props.status == "Fostered" ? (
                  <Button onClick={adoptPet}>Adopt</Button>
                ) : (
                  ""
                )}


                {props.status == "Adopted" && auth.userId == props.savedby ? (
                  <Button onClick={removePet}>Return Foster</Button>
                ) : (
                  ""
                )}
                {props.status === "Adopted"  && (
                  
                  <h3>Pet has been Adopted</h3>
                )}
              </div>
            )}
            {isAdmin && (
              <React.Fragment>
                <Button onClick={showDeleteWarningHandler}>Remove</Button>
                <Button danger to={`/pet/${props.id}`}>
                  Edit
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AnimalItem;
