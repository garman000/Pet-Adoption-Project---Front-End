import React, {
  useCallback,
  useReducer,
  useContext,
  useState,
  useRef,
} from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPets.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import FormData from "form-data";

const NewPets = () => {
  const auth = useContext(AuthContext);
  const [addPicture, setAddPicture] = useState();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      breed: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
      height: {
        value: "",
        isValid: false,
      },
      color: {
        value: "",
        isValid: false,
      },
      dietaryrequirements: {
        value: "",
        isValid: false,
      },
      hypoallergenic: {
        value: "",
        isValid: false,
      },
      bio: {
        value: "",
        isValid: false,
      },
      picture: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    setAddPicture(e.target.files[0]);
  };

  const petSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    try {
      const formData = new FormData();
      formData.append("type", formState.inputs.type.value);
      formData.append("name", formState.inputs.name.value);
      formData.append("breed", formState.inputs.breed.value);
      formData.append("weight", formState.inputs.weight.value);
      formData.append("height", formState.inputs.height.value);
      formData.append("color", formState.inputs.color.value);
      formData.append(
        "dietaryrequirements",
        formState.inputs.dietaryrequirements.value
      );
      formData.append("hypoallergenic", formState.inputs.hypoallergenic.value);
      formData.append("bio", formState.inputs.bio.value);
      formData.append("picture", formState.inputs.picture.value);
      formData.append("status", formState.inputs.status.value);
      formData.append("savedby", auth.userId);
      formData.append(
        "image",
        formState.inputs.image.value,
        formState.inputs.image.value.name
      );
      await sendRequest(
        "http://localhost:8080/pet",
        "POST",
        formData);
        // JSON.stringify({
        //   type: formState.inputs.type.value,
        //   name: formState.inputs.name.value,
        //   breed: formState.inputs.breed.value,
        //   weight: formState.inputs.weight.value,
        //   height: formState.inputs.height.value,
        //   color: formState.inputs.color.value,
        //   dietaryrequirements: formState.inputs.dietaryrequirements.value,
        //   hypoallergenic: formState.inputs.hypoallergenic.value,
        //   bio: formState.inputs.bio.value,
        //   picture: formState.inputs.picture.value,
        //   status: formState.inputs.status.value,
        //   savedby: auth.userId,
        //   image: formState.inputs.image.value,
        // }),
        // {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + auth.token,
        // }
      
      navigate("/allanimals");
    } catch (err) {}
  };

  return (
    <>
      <div>
        <h1>NEW PETS</h1>
      </div>

      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="place-form" onSubmit={petSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
          />
          
          <Input
            id="type"
            element="input"
            type="text"
            label="Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
          />
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter aniamls name."
            onInput={inputHandler}
          />
          <Input
            id="breed"
            element="input"
            type="text"
            label="Breed"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid breed"
            onInput={inputHandler}
          />
          <Input
            id="weight"
            element="input"
            type="text"
            label="Weight"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid weight"
            onInput={inputHandler}
          />
          <Input
            id="height"
            element="input"
            type="text"
            label="Height"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid height"
            onInput={inputHandler}
          />{" "}
          <Input
            id="color"
            element="input"
            type="text"
            label="Color"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid color"
            onInput={inputHandler}
          />{" "}
          <Input
            id="dietaryrequirements"
            element="input"
            type="text"
            label="Dietary Requirements"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter any dietary restrictions animal may have"
            onInput={inputHandler}
          />
          <Input
            id="hypoallergenic"
            element="input"
            type="text"
            label="Allergies"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Hypoallergenic?"
            onInput={inputHandler}
          />
          <Input
            id="bio"
            element="input"
            type="text"
            label="Bio"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Add bio"
            onInput={inputHandler}
          />
          <Input
            id="picture"
            element=""
            type=""
            label="Picture"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Animal Status"
            onInput={inputHandler}
          />
          <Input
            id="status"
            element="input"
            type="text"
            label="Status"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Animal Status"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add Pets
          </Button>
        </form>
      </React.Fragment>
    </>
  );
};

export default NewPets;
