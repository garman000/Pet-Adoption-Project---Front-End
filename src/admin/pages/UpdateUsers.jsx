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

// const DUMMY_USER = [
//   {
//     id: "p1",
//     firstname: "Michael",
//     lastname: "Carrick",
//     email: "carrick@mufc.com",
//     password: "111111",
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     firstname: "Dimitar",
//     lastname: "Berbatov",
//     email: "manutd",
//     password: "111111",
//     creator: "u2",
//   },
// ];

const UpdateUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [ loadedUsers, setloadedUsers] = useState()
  const userId = useParams().userId;
  const navigate = useNavigate()
 

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const identifiedUser = DUMMY_USER.find((p) => p.id === userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:8080/users/${userId}`)
        console.log('usertest', responseData)
        setloadedUsers(responseData.user)
        setFormData(
          {
            firstname: {
              value: responseData.user.firstname,
              isValid: true,
            },
            lastname: {
              value: responseData.user.lastname,
              isValid: true,
            },
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            password: {
              value: responseData.user.password,
              isValid: true,
            },
          },
          true
        );
     
      } catch (err) {}
    }
    fetchUser()
  }, [sendRequest, userId, setFormData])


  const userUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
    await sendRequest(`http://localhost:8080/users/${userId}`, 'PUT', JSON.stringify({
      firstname: formState.inputs.firstname.value,
      lastname: formState.inputs.lastname.value,
      email: formState.inputs.email.value,
      password: formState.inputs.firstname.value,
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

  if (!loadedUsers && !error) {
    return (
      <Card className="center">
        <h2>Could not find User!</h2>
      </Card>
    );
  }


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} /> 
    {!isLoading && loadedUsers && (<form className="place-form" onSubmit={userUpdateSubmitHandler}>
      <Input
        id="firstname"
        element="input"
        type="text"
        label="First Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedUsers.firstname}
        initialValid={true}
      />

      <Input
        id="lastname"
        element="input"
        label="lastname"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedUsers.lastname}
        initialValid={true}
      />
      <Input
        id="email"
        element="input"
        label="Email"
        type="email"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedUsers.email}
        initialValid={true}
      />
      <Input
        id="password"
        element="input"
        label="Password"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter your email"
        onInput={inputHandler}
        initialValue={loadedUsers.password}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE USER
      </Button>
    </form>)}
    </React.Fragment>
  );
};

export default UpdateUser;
