import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import AuthContext from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import localforage from "localforage";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { closeModalHandler } = props;
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          // image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstname: {
            value: "",
            isValid: false,
          },
          lastname: {
            value: "",
            isValid: false,
          },
          phonenumber: {
            value: "",
            isValid: false,
          },
         
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
   

   if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:8080/auth/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log("logintest", responseData.user.firstname);
        localforage.setItem("userInfo", responseData.user)
        auth.login(responseData.user.id, responseData.token);
        navigate("/home");
        console.log('jwttest', responseData)
      } catch (err) {}
    } else {
      if (formState.inputs.password.value !==  formState.inputs.confirmPassword.value
        ) {
          alert("Passwords don't match");
          return;
        }
        try {
          const responseData = await sendRequest(
            "http://localhost:8080/auth/signup",
            "POST",
            JSON.stringify({
              firstname: formState.inputs.firstname.value,
              lastname: formState.inputs.lastname.value,
              email: formState.inputs.email.value,
              phonenumber: formState.inputs.phonenumber.value,
              password: formState.inputs.password.value,
              // confirmPassword: formState.inputs.confirmPassword.value,
            }),
            {
              "Content-Type": "application/json",
            },
            
            
            );
            console.log('token test', responseData)
    
        auth.login(responseData.user.id, responseData.token);
        navigate("/home");
      } catch (err) {}
    } 
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {/* {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} />} */}
          {!isLoginMode && (
            <React.Fragment>
              <Input
                element="input"
                id="firstname"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="lastname"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="phonenumber"
                type="number"
                label="Phone Number"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid phone number."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Passwords need to match"
                onInput={inputHandler}
              />
            </React.Fragment>
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button
            type="button"
            onClick={authSubmitHandler}
            disabled={!formState.isValid}
            
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
