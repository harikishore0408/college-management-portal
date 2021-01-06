import React from 'react';
import Teacher from './Teacher'
import Student from './Student'
import '../css/Profile.css'



class Profile extends React.Component{
   

   
    render(){
        return(
            <div className='profile'>

                {this.props.profile=='teacher'?<Teacher/>:<Student/>}
             {/* <Student/> */}
             {/* <Teacher/> */}
              
            </div>
        );
    }
}

export default Profile;