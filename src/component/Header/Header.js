import logo from '../../images/logo.png';
import React, { useContext } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const name = loggedInUser.displayName || loggedInUser.name;
    const current = false;
    return (
        <>
            <div className="header-component">
                <img src={logo} alt="" />
            </div>
            <div className='header-list'>
                <ul>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/review">Order Review</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    {name && <li><Link to="/profile">Welcome {name}</Link></li>}
                    {loggedInUser.email && <li><a onClick={() => setLoggedInUser({})} href='/' >Sign Out</a></li>}
                </ul>
            </div>
        </>

    );
};

export default Header;