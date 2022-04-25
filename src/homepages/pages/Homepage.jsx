import React from 'react';
import { Container, Button } from 'react-bootstrap';
import "../components/Homepage.css";
// import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';

function Homepage(props) {
    return (
        <Container>
            <div className="homepageIMG">
                <div className='test'>
                    <div className='display-4'> Welcome User, this is your home</div>
                </div>
            </div>

            {/* <Button as={NavLink} to="/userprofile" >User Profile </Button>  */}
      

        // </Container>
    );
}

export default Homepage;