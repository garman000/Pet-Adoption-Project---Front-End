import React,  { useEffect, useState} from 'react';
import PetList from "./PetList"
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import SearchBox from "../../shared/SearchBox"
import "./fetchAllPets.css";
import { useHttpClient } from '../../shared/hooks/http-hook';



const fetchAllPets = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPets, setloadedPets] = useState();




    return (
        <div>
            
        </div>
    );
};

export default fetchAllPets;