import React from 'react';
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
                {/* <Teacher/> */}
                <Student/>
              
            </div>
        );
    }
}

export default Profile;