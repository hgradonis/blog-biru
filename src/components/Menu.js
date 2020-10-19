import React from 'react';
import {Link} from 'react-router-dom';

const Menu = (props) => (
    <nav id='menu'>
        <Link to='/'>
            Users ss 
        </Link>
        <Link to='/tareas2'>
            chores "tareas"
        </Link>

    </nav>
);
export default Menu;