import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient  } from "../../shared/hooks/http-hook";
import "../../pets/pages/NewPets.css";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdatePet = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [ loadedPets, setloadedPets] = useState()
  const petId = useParams().petId;
  const navigate = useNavigate()
 

  const [formState, inputHandler, setFormData] = useForm(
    {
      type: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
      picture: {
        value: "",
        isValid: false,
      },
      height: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      bio: {
        value: "",
        isValid: false,
      },
      hypoallergenic: {
        value: "",
        isValid: false,
      },
      dietaryrequirements: {
        value: "",
        isValid: false,
      },
      breed: {
        value: "",
        isValid: false,
      },
       owner: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:8080/pet/${petId}/update`)
        console.log('PetTest', responseData)
        
        setloadedPets(responseData.pets)
        setFormData(
          {
            type: {
              value: responseData.user.type,
              isValid: true,
            },
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            status: {
              value: responseData.user.status,
              isValid: true,
            },
            picture: {
              value: responseData.user.picture,
              isValid: true,
            },
            height: {
                value: responseData.user.height,
                isValid: true,
              },
              weight: {
                value: responseData.user.weight,
                isValid: true,
              },
              color: {
                value: responseData.user.color,
                isValid: true,
              },
              bio: {
                value: responseData.user.bio,
                isValid: true,
              },
              hypoallergenic: {
                value: responseData.user.hypoallergenic,
                isValid: true,
              },
              dietaryrequirements: {
                value: responseData.user.dietaryrequirements,
                isValid: true,
              },
              breed: {
                value: responseData.user.breed,
                isValid: true,
              },
              owner: {
                value: responseData.user.owner,
                isValid: true,
              },

          },
          true
        );
     
      } catch (err) {}
    }
    fetchPet()
  }, [sendRequest, petId, setFormData])


  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
    await sendRequest(`http://localhost:8080/users/${petId}`, 'PUT', JSON.stringify({
      type: formState.inputs.type.value,
      name: formState.inputs.name.value,
      status: formState.inputs.status.value,
      picture: formState.inputs.picture.value,
      height: formState.inputs.height.value,
      weight: formState.inputs.weight.value,
      color: formState.inputs.color.value,
      bio: formState.inputs.bio.value,
      hypoallergenic: formState.inputs.hypoallergenic.value,
      dietaryrequirements: formState.inputs.dietaryrequirements.value,
      breed: formState.inputs.breed.value,
      owner: formState.inputs.owner.value,
      image: formState.inputs.image.value
  }),
  {
    'Content-Type': 'application/json'
  })
  navigate('/home')
  } catch (err) {}
}

  if (isLoading) {
      return (
          <div className="center">
              <LoadingSpinner />
          </div>
      )
  }

  if (!loadedPets && !error) {
    return (
      <Card className="center">
        <h2>Could not find User!</h2>
      </Card>
    );
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} /> 
    {!isLoading && loadedPets && (<form className="place-form" onSubmit={userUpdateSubmitHandler}>
      <Input
        id="type"
        element="input"
        type="text"
        label="Type"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPets.type}
        initialValid={true}
      />

      <Input
        id="name"
        element="input"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPets.name}
        initialValid={true}
      />
      <Input
        id="status"
        element="input"
        label="status"
        type="status"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.status}
        initialValid={true}
      />
      <Input
        id="picture"
        element="input"
        label="picture"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.picture}
        initialValid={true}
      />
      <Input
        id="height"
        element="input"
        label="height"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.height}
        initialValid={true}
      />
      <Input
      id="weight"
      element="input"
      label="weight"
      type="text"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter your email"
      onInput={inputHandler}
      initialValue={loadedPets.weight}
      initialValid={true}
    />
    <Input
        id="color"
        element="input"
        label="color"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.color}
        initialValid={true}
      />
      <Input
        id="bio"
        element="input"
        label="bio"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.bio}
        initialValid={true}
      />
      <Input
        id="hypoallergenic"
        element="input"
        label="hypoallergenic"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.hypoallergenic}
        initialValid={true}
      />
      <Input
        id="dietaryrequirements"
        element="input"
        label="dietaryrequirements"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.dietaryrequirements}
        initialValid={true}
      />
      <Input
        id="breed"
        element="input"
        label="breed"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.breed}
        initialValid={true}
      />
      <Input
        id="owner"
        element="input"
        label="owner"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedPets.owner}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE USER
      </Button>
    </form>)}
    </React.Fragment>
  );
};

export default UpdatePet;
