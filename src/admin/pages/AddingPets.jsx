import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './AddingAnimalsForm.css';


const AddingPets = (props) => {
    return (
        <>
        <h1>hello add me</h1>
        <form className='place-form'>
            <Input type="text" label="Animal"  element="input" />
        </form>
        </>
    );
};

export default AddingPets;