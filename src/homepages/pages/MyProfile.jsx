import React from 'react';
import UpdateUsers from '../../admin/pages/UpdateUsers';
import UserPets from '../../pets/pages/UserPets';

const MyProfile = () => {
    return (
        <div>

            <h1>MY Profile</h1>
            <UpdateUsers />
            <UserPets />
        </div>
    );
};

export default MyProfile;