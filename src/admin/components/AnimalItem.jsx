import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import bootstrap from "bootstrap";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Auth from "../pages/Auth";
import AuthContext from "../../shared/context/auth-context";

const AnimalItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:8080/pet/${props.id}`, "DELETE");
      props.onDelete(props.id);
    } catch (err) {}
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

          <div className="user-item__content">
            <div className="user-item__image">
              <img className="petImage" src={props.picture} />
            </div>
            <div className="user-item__info">
              <h2>{props.type}</h2>
              <p>
                <strong>Breed: </strong>
                {props.breed}
              </p>
              <p>
                <strong>Colour: </strong>
                {props.color}
              </p>
              <p>
                <strong>Status: </strong> {props.status}
              </p>
              <p>
                <strong>Bio: </strong>
                {props.bio}
              </p>
            </div>
          </div>
          <div className="place-item__actions">
            <Button inverse>Save</Button>
            <Button inverse>Adopt</Button>
            <Button inverse>Foster</Button>
            {auth.isLoggedIn && (
              <React.Fragment>
                <Button onClick={showDeleteWarningHandler}>Remove</Button>
                <Button>Edit</Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AnimalItem;
