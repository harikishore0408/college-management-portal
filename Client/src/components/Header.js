import React from 'react';
import '../css/Header.css';
import User from './User';
import home from '../assets/home.svg'

class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <img id='home' src={home} />
                <h1>College Management Portal</h1>
                <User/>
            </div>
        );
    }
}

export default Header;