import React from 'react';
import UpdateUsers from '../../admin/pages/UpdateUsers';
import UserPets from '../../pets/pages/UserPets';

const MyProfile = () => {
    return (
        <div>

            <h1 className='center'>My Profile</h1>
            <h3 className='center'>Your Current Pets</h3>
            <UserPets />
            <h3 className='center'>Update User Profile</h3>
            <UpdateUsers />
        </div>
    );
};

export default MyProfile;