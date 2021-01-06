import React from 'react';
import StudentDashboard from './StudentDashboard'
import '../css/Student.css'



class Student extends React.Component{
    constructor(){
        super();
        this.state = {
        }
    }

    
    render(){
        return(
            <div className='student'>
                <StudentDashboard/>
            </div>
        );
    }
}

export default Student;