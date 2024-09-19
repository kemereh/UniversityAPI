// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Degrees</Link></li>
                <li><Link to="/module">Modules</Link></li>
                <li><Link to="/cohort">Cohorts</Link></li>
                <li><Link to="/create">Create Degree</Link></li>
                <li><Link to="/student/create">Create Student</Link></li>
                <li><Link to="/cohort/create">Create Cohort</Link></li>
                <li><Link to="/module/create">Create Module</Link></li>
                <li><Link to="/grade/set">Set Grade</Link></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
