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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnimalItem = (props) => {
  const auth = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);
  const { userId, userInfo } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { id } = props;
  const navigate = useNavigate();
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const [isSaved, setIsSaved] = useState(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:8080/pet/${id}`, "DELETE");
      props.onDelete(id);
    } catch (err) {}
  };
  function showMore(pid) {
    navigate(`/showpets/${pid}`);
  }
  const savePetHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:8080/pet/${userId}/save`,
        "POST",
        JSON.stringify({
          _id: props.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.onSave(responseData.pet);
      console.log(props.id);
      console.log(responseData.pet);
      console.log(auth.token);
      console.log(userId);
      setIsSaved(true);
    } catch (err) {}
    alert("Pet saved!");
    // history.push("/pet/user/:userId");
  };
  async function fostered() {
    try {
      const repsonse = await axios.post(
        `
      http://localhost:8080/pet/${id}/fostered`,
        userId
      );
      console.log(userInfo);
    } catch (err) {}
  }
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
              <h1>{props.name}</h1>
              <h2>{props.type}</h2>
              {/* <p>
                <strong>Breed: </strong>
                {props.breed}
              </p> */}
              {/* <p>
                <strong>Colour: </strong>
                {props.color}
              </p> */}
              <p>
                <strong>Status: </strong> {props.status}
              </p>
              {/* <p>
                <strong>Bio: </strong>
                {props.bio}
              </p> */}
            </div>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => showMore(id)}>
              See More
            </Button>
            <Button inverse onClick={savePetHandler}>
              Save
            </Button>
            <Button inverse>Adopt</Button>
            <Button inverse onClick={() => fostered(id)}>
              Foster
            </Button>
            {isAdmin && (
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
