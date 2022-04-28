import React from 'react';
import { Container } from 'react-bootstrap';
import "../components/Homepage.css";
// import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';
import Button from "../../shared/components/FormElements/Button"


function Homepage(props) {
    return (
        <Container>
            <div className="homepageIMG">
                <div className='test'>
                    <div className='display-4'> Welcome User, this is your home</div>
                </div>
            </div>

            <Button >Search</Button> 
            <Button >MyPets</Button> 
            <Button >Settings</Button> 
      

    </Container>
    );
}

export default Homepage;