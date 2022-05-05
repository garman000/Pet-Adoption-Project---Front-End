import React, { useState } from "react";
// import { Container, Nav, Button } from "react-bootstrap";
import "../components/WelcomePage.css";
import { NavLink } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
// import bootstrap from "bootstrap"
import { useForm } from "../../shared/hooks/form-hook";
import Modal from "../../shared/components/UIElements/Modal";
import Auth from "../../admin/pages/Auth";
import Card from "../../shared/components/UIElements/Card";

const WelcomePage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const closeModalHandler = () => setShowModal(false);
  const openModalHandler = () => setShowModal(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
    {/* <Card className="authentication__modal-container" > */}
      <Modal
      className="authentication__modal"
        show={showModal}
        onCancel={closeModalHandler}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
      >
        <Auth closeModalHandler={closeModalHandler} />
      </Modal>
      {/* </Card> */}
      <div className="animalImage">
        <div className="titleControl">
          <h1 className="display-4">DO YOU LOVE ANIMALS?</h1>
          <h4 className="py-2">Want to Foster or Adopt?</h4>
          <div className="buttonControl">
            {/* <Button variant="outline-dark" to="/search" as={NavLink}>
              See Our Animals
            </Button> */}
            {/* <Button
              className="btn btn-outline-dark btn-sm"
              //   modalShow={showSignUp}
              onClick={openModalHandler}
              variant="outline-dark"
            >
              Sign-Up
            </Button> */}
            <Button
              className="btn btn-outline-dark btn-sm"
              // onClick={showDeleteWarningHandler}
              onClick={openModalHandler}
              variant="outline-dark"
            >
              SignUp/Login
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="paraControl">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga unde
            veritatis quas amet similique doloribus cumque atque blanditiis,
            rerum laborum voluptatum totam laudantium quos nisi dignissimos
            voluptatem. Nisi, iste quidem? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Rem nemo cupiditate, blanditiis
            obcaecati aperiam, similique eius non saepe ipsum illum adipisci
            modi, reprehenderit fugit perspiciatis architecto officiis tenetur
            hic maxime sit nisi. Deserunt doloremque accusamus ut dignissimos
            dolorum commodi dolorem quis aut debitis voluptas itaque quo iure,
            at facere labore.
          </p>
        </div>
      </div>
     
    </React.Fragment>
  );
};

export default WelcomePage;
