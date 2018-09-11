import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div id="main-menu">
            <Link to="/" >Home</Link>
            <Link to="/products" >Products</Link>
        </div>
    );
}

export default Menu;