import React, { useContext, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import "./PetItem.css";
import AuthContext from "../../shared/context/auth-context";
import Avatar from "../../shared/components/UIElements/Avatar";

const PetItem = (props) => {
  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("deleting");
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
            {/* <img className="petImage" src={props.image} alt={props.name} /> */}
            <div className="user-item__image"></div>
            <Avatar image={`http://localhost:8080/${props.image}`} />
          </div>
          
          <div className="place-item__info">
            <h1>
              {" "}
              {props.name} {props.breed}{" "}
            </h1>
            <h3>Age:{props.age}</h3>
            <p>{props.bio} </p>
          </div>

          <div className="place-item__actions">
            <Button inverse>BIO</Button>
            {auth.isLoggedIn && (
              <Button to={`/pet/${props.id}`}>EDIT PET</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                REMOVE PET
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PetItem;
