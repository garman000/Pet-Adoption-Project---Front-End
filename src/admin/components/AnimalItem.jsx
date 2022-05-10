import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import bootstrap from "bootstrap";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Auth from "../pages/Auth";
import AuthContext from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../../shared/components/UIElements/Avatar";
// import ShowMore from 'react-show-more-button';
import ShowMore from 'react-show-more-button/dist/module';
import './UserItem.css';

const AnimalItem = (props) => {
  const auth = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);
  const { userId, userInfo } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { id, status } = props;
  const navigate = useNavigate();
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isSavedToggle, setSavedToggle] = useState(true)




  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:8080/pet/${id}`, "DELETE");
      props.onDelete(id);
    } catch (err) {}
  };
  // function showMore(pid) {
  //   navigate(`/showpets/${pid}`);
  // }

  const savePetHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:8080/pet/${userId}/save`,
        "POST",
        JSON.stringify({
          _id: props.id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.onSave("saving test", responseData);
      console.log(props.id);
      console.log(responseData.pet);
      console.log(userId);
      setIsSaved(true);
    } catch (err) {}
    
  };



  async function fostered() {
    try {
      const repsonse = await axios.post(
        `
      http://localhost:8080/pet/${id}/fostered`,
        userId
      );
      console.log(userInfo);
    } catch (err) {}
  }

  const savePet = async () => {
    // e.preventDefault();
    try {
      const responseData = await sendRequest(`http://localhost:8080/users/${userId}`)
      const userPetsArray = responseData.user.pets;
      if (userPetsArray.includes(props.id)) {
        alert("Pet has been saved!")
      } else if 
        (props.status === "Available" || "Fostered") {
          try {
            responseData = await sendRequest(
              `http://localhost:8080/pet/${userId}/save`, 'POST',
              JSON.stringify({
              _id: props.id,
              userId: userId,
              }),
              {
                'Content-Type': "application/json"
              }
            )
          } catch (err) {}
          alert('Pet Saved')
          navigate(`/${auth.userId}/mypets`)
        
    }
    
      console.log('userID test 3', userId)
    } catch (err) {
      
    }
  }
  
  const removePet = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendRequest(`http://localhost:8080/users/${userId}`)
      const userPetsArray = responseData.user.pets;
            try {
            responseData = await sendRequest(
              `http://localhost:8080/pet/${userId}/save`, 'DELETE',
              JSON.stringify({
              _id: props.id,
              userId: userId,
              }),
              {
                'Content-Type': "application/json"
              }
            )
          } catch (err) {}
          alert('Removed saved pet')
        
        }
        catch (err) {}
  
  }  
  
  const fosterPet = async (e) => {
    e.preventDefault();
  if( props.status === "Available") {
    savePet();
  // try {
  //   const responseData = await sendRequest(`http`)
  // }  
  try{
    const responseData = await sendRequest(`http://localhost:8080/pet/${props.id}`, 'PUT', 
    JSON.stringify({
      status: "Fostered",
      savedby: auth.userId
    }),
    {
      'Content-Type': "application/json"
    })
    alert('Pet has been fostered')
  } catch(err) {}
} else {
  alert("Can only foster available pets")
}

}

// const adoptPet = async (e) => {
//   e.preventDefault();
// if( props.status === "Available" || "Fostered" ) {
//   savePet();
// try{
//   const responseData = await sendRequest(`http://localhost:8080/pet/${props.id}/fostered`, 'POST', 
//   JSON.stringify({
//     status: "Fostered"
//   }),
//   {
//     'Content-Type': "application/json"
//   })
//   alert('Pet has been fostered')
// } catch(err) {}
// } else {
// alert("Can only foster available pets")
// }

// }


  // const switchSaveToggle = () => {
  //   setSavedToggle(!isSsavedToggle)
  // } 

  return (
    <React.Fragment>

      
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Close
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Remove{" "}
            </Button>
          </React.Fragment>
        }
      >
        <p>Once removed, never returned</p>
      </Modal>
      <li className="user-item">
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2 className="center">{props.name}</h2>
          <p className="center">
                <strong>Status: </strong> {props.status}
                 </p>
          <ShowMore backgroundColor="white" styleButton={{borderRadius: "4px",background: "white", padding: "0.8rem", border: "1px solid #FF0055", color: "#FF0055"}}>
          <div className="user-item__content">
         
            <div className="place-item__image">
               <img className="imageControl" src={props.image} />
            </div>
            <div className="place-item__info">
              <h2 className="center">{props.type}</h2>
         
            
              </div>
              </div>
             
              <p>
                <strong>Breed: </strong>
                {props.breed}
              </p> 
              <p>
                <strong>Colour: </strong>
                {props.color}
              </p> 
              <p>
                <strong>Bio: </strong>
                {props.bio}
              </p>
              
            </ShowMore>
          <div className="place-item__actions">
         {auth.isLoggedIn && (   
            <div className="buttonCtl">
            
            <Button inverse onClick={savePet}>
              Save
            </Button>
           <Button inverse>Adopt</Button>
            <Button inverse onClick={fosterPet}>
              Foster
            </Button>
            </div>
            )}
            {isAdmin && (
              <React.Fragment>
                <Button onClick={showDeleteWarningHandler}>Remove</Button>
                <Button danger to={`/pet/${props.id}`}>
                  Edit
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default AnimalItem;
