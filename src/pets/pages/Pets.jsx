import React from 'react';
import { Container } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import PetList from '../components/PetList.jsx';

const Pets = () => {
    const PETS = [
        {
            id: "u1",
            name: "Casper",
            breed: "Dog",
            age: "3",
            image:
              "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            bio: "This Pet is very friendly with kids."
          },
    ];
    return (
        <Container>
            <h1 className='d-flex justify-content-center'>Pets</h1>
            <PetList items={PETS}  />
        </Container>
    );
}

export default Pets;