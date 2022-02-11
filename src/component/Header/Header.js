import logo from '../../images/logo.png';
import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="header-component">
                <img src={logo} alt="" />
            </div>
            <div className='header-list'>
                <ul>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/review">Order Review</Link></li>
                    <li><Link to="/inventory">Manage Inventory</Link></li>
                </ul>
            </div>
        </>

    );
};

export default Header;