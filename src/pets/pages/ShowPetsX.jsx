import React, { useContext, useEffect } from 'react';
import Card from '../../shared/components/UIElements/Card';
import AuthContext from '../../shared/context/auth-context';
import UserPets from './UserPets';
import { useHttpClient } from '../../shared/hooks/http-hook';
import axios from 'axios';


const ShowPetsX = ({petId , setid , id}) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext)

    useEffect(() => {

        async function showExtraPets(){
          try {
            const responseData = await axios.get(
              `http://localhost:8080/pet/${petId}`
            );
            console.log("specifypet", responseData);
            console.log(responseData);
            console.log(petId.petId)
            console.log(petId)
            console.log(petId.id)
            console.log(id)
            console.log('hello')
          } catch (err) {
              console.log(err)
          }
        };
    
        showExtraPets();
      }, [sendRequest ]);

    return (
        <div>
           <Card>
               <UserPets />
               
                <h1>Hello</h1>
           </Card>
        </div>
    );
};

export default ShowPetsX;