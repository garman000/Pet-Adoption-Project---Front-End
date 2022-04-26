import React, { useState } from "react";

// import Avatar from "../../shared/components/UIElements/Avatar";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Card from "../../shared/components/UIElements/Card";
import "./PetItem.css";

const PetItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false)

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
      {/* <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header="authentication"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeModalHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h1>The MODAL</h1>
          
        </div>
      </Modal> */}
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
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure youd like to remove this pet?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img className="petImage" src={props.image} alt={props.name} />
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
            {/* <Button to={`/pets/${props.id}`}>EDIT PET</Button> */}
            <Button danger onClick={showDeleteWarningHandler}>
              REMOVE PET
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PetItem;
