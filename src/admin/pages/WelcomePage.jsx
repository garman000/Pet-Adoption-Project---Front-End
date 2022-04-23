import React, { useState } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import "./WelcomePage.css";
import { NavLink } from "react-router-dom";

import bootstrap from "bootstrap";

function WelcomePage() {

  return (
    <Container>
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
            //   onClick={handleShowSignUp}
              variant="outline-dark"
            >
              Sign-Up
            </Button>
            <Button
              className="btn btn-outline-dark btn-sm"
            //   modalShow={showLogin}
            //   onClick={handleShowLogin}
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
    </Container>
  );
}

export default WelcomePage;
