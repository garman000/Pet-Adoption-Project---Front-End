import React,  { useEffect, useState} from 'react';
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from '../../shared/hooks/http-hook'
import "./SearchBox.css"

const SearchBox = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPets, setLoadedPets] = useState([]);
    const [petType, setPetType] = useState("");
    const [petStatus, setPetStatus] = useState("");
    const [petHeight, setPetHeight] = useState("");
    const [petName, setPetName] = useState("");
    const [petWeight, setPetWeight] = useState("");

    const searchPets = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:8080/pet/search?type=${petType}&status=${petStatus}&height=${petHeight}&name=${petName}&weight=${petWeight}`
          );
          setLoadedPets(responseData.pets);
        } catch (err) { }
      };







    return (
        <div>
            
        </div>
    );
};

export default SearchBox;