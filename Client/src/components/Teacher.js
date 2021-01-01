import React from 'react';
import Axios from 'axios';
import '../css/Teacher.css'
import TeacherPost from './TeacherPost'
import TeacherDashboard from './TeacherDashboard';
import StudentSection from './StudentSection';


class Teacher extends React.Component{

    constructor(){
        super();
        this.state = {
            assignments:[],
            course:{},

        }
    }



    getCourse = () =>{ //  getting all the course and its topics
        
        Axios({
            method:'GET',
            url:'http://localhost:8000/teacher/get-course',
            withCredentials:true
        }).then(
            (res)=>{
                console.log(res.data);
                this.setState({course:res.data})
                // this.props.updateCourse(res.data);
            })
        .catch((err)=>{console.log(err)});
    }

    getAssignmnet = () =>{
        Axios({
            method:'GET',
            url:'http://localhost:8000/teacher/assignment-list',
            withCredentials:true
        }).then(
            (res)=>{
                console.log(res.data);
                this.setState({assignments:res.data})
            })
        .catch((err)=>{console.log(err)});
    }

    updateCourse = () =>{
        this.getCourse();
    }
    updateAssignment = () =>{
        this.getAssignmnet();
    }

   
    

    componentDidMount(){
        this.getCourse();
        this.getAssignmnet();

    }
       

    render(){

        console.log('assignment state-----',this.state.assignments)
        return(
            <div className='teacher'>
                
               


                {/* course will get update from adding topics in TeacherDashboard Component */}
                <TeacherDashboard 
                    course={this.state.course}
                    updateCourse={this.updateCourse}
                />

                <TeacherPost 
                    course={this.state.course}
                    assignments={this.state.assignments}
                    updateAssignment={this.updateAssignment}
                    
                />
                <StudentSection/>

            </div>
            
        );
    }
}

export default Teacher;