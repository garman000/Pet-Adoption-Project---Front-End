import React, { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import "./PetItem.css";
import AuthContext from "../../shared/context/auth-context";
import Avatar from "../../shared/components/UIElements/Avatar";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Navigate, useNavigate } from "react-router-dom";

const PetItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const { id, status } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
  
  };

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

  const removeAdoptedPet = async (e) => {
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
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              {" "}
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              {" "}
              REMOVE
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure youd like to remove this pet?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} />
          </div>

          <div className="place-item__info">
            <h1> {props.name}</h1>

            <h3>
              <strong>Breed: </strong>
              {props.breed}
            </h3>
            <h4>
              {" "}
              <strong>Bio: </strong>
              {props.bio}{" "}
            </h4>
          </div>

          <div className="place-item__actions">
            {/* <Button inverse >SAVE</Button> */}
            {auth.isAdmin && <Button to={`/pet/${props.id}`}>EDIT PET</Button>}
            {auth.isLoggedIn && (
              <>
                {/* <Button danger onClick={removeAdoptedPet}>
                 Mayb return foster?
                </Button> */}
                <Button danger onClick={removePet}>
                  Return Saved Pet
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PetItem;
