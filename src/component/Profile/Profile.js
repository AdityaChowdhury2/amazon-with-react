import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const name = loggedInUser.name || loggedInUser.displayName;
    return (
        <div>
            Profile Picture : <img src={loggedInUser.photo} alt="" style={{ width: '100px' }} />
            <br />
            Name : {name}
            <br />
            Email : {loggedInUser.email}
            <br />
        </div>
    );
};

export default Profile;