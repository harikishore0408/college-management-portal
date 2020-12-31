import React from 'react';
import Axios from 'axios';
import StudentDashboard from './StudentDashboard'



class Student extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }

    
    render(){
        return(
            <div className='student'>
                <h2>Student profile</h2>
                <StudentDashboard/>
            </div>
        );
    }
}

export default Student;