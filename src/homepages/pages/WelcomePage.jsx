import React, { useState } from "react";
// import { Container, Nav, Button } from "react-bootstrap";
import "../components/WelcomePage.css";
import { NavLink } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
// import bootstrap from "bootstrap";
import Modal from "../../shared/components/UIElements/Modal";

const WelcomePage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeModalHandler = () => setShowModal(false)
  const openModalHandler = () => setShowModal(true)

  return (
    <React.Fragment>
      {/* <Container> */}
        <Modal
          show={showModal}
          onCancel={closeModalHandler}
          header="LOG IN!"
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeModalHandler}>LOGIN</Button>}
        >
          <div className="map-container">

          
          </div>
          </Modal>
         {/* <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal> */}
        <div className="animalImage">
          <div className="titleControl">
            <h1 className="display-4">DO YOU LOVE ANIMALS?</h1>
            <h4 className="py-2">Want to Foster or Adopt?</h4>
            <div className="buttonControl">
              <Button variant="outline-dark" to="/search" as={NavLink}>
                See Our Animals
              </Button>
              <Button
                className="btn btn-outline-dark btn-sm"
                //   modalShow={showSignUp}
                  onClick={openModalHandler}
                variant="outline-dark"
              >
                Sign-Up
              </Button>
              <Button
                className="btn btn-outline-dark btn-sm"
                // onClick={showDeleteWarningHandler}
                  onClick={openModalHandler}
                variant="outline-dark"
              >
                Login
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
      {/* </Container> */}
    </React.Fragment>
  );
}

export default WelcomePage;
