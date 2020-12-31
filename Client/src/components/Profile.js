import React from 'react';
import Axios from 'axios';
import User from './User';
import Teacher from './Teacher'
import Student from './Student'



class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }

   
    render(){
        return(
            <div className='profile'>
                <User/>
                <Teacher/>
                {/* <Student/> */}
              
            </div>
        );
    }
}

export default Profile;