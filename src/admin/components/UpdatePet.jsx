import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "../../shared/context/auth-context";
import logo from "../../shared/components/Navigation/navimage/logo.png";

const UpdatePet = () => {
  const auth = useContext(AuthContext);

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
      },
    false
  );

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:8080/pet/${petId}`)
        
        
        setloadedPets(responseData.pet)
        setFormData(
          {
            type: {
              value: responseData.pet.type,
              isValid: true,
            },
            name: {
              value: responseData.pet.name,
              isValid: true,
            },
            status: {
              value: responseData.pet.status,
              isValid: true,
            },
            picture: {
              value: responseData.pet.picture,
              isValid: true,
            },
            height: {
                value: responseData.pet.height,
                isValid: true,
              },
              weight: {
                value: responseData.pet.weight,
                isValid: true,
              },
              color: {
                value: responseData.pet.color,
                isValid: true,
              },
              bio: {
                value: responseData.pet.bio,
                isValid: true,
              },
              hypoallergenic: {
                value: responseData.pet.hypoallergenic,
                isValid: true,
              },
              dietaryrequirements: {
                value: responseData.pet.dietaryrequirements,
                isValid: true,
              },
              breed: {
                value: responseData.pet.breed,
                isValid: true,
              },
              owner: {
                value: responseData.pet.owner,
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
    await sendRequest(`http://localhost:8080/pet/${petId}`, 'PUT', JSON.stringify({
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
    }),
  {
    'Content-Type': 'application/json'
  })
  navigate('/allanimals')
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
        <h2>Could not find Pet!</h2>
      </Card>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} /> 
    {!isLoading && loadedPets && (<form className="place-form" onSubmit={userUpdateSubmitHandler}>
    <div className="center"><img src={logo} width="200" /></div>
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
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PET
      </Button>
    </form>)}
    </React.Fragment>
  );
};

export default UpdatePet;
