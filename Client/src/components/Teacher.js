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
            students:[{}]

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

    getAssignmnets = () =>{
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

    getStudents = () =>{
        Axios({
            method:"GET",
            url:'http://localhost:8000/teacher/get-students',
            withCredentials:true
        })
        .then((res)=>{
            console.log('-----getting Student---',res);
            this.setState({students:res.data});
      
      }).catch((error)=>{console.log(error)});
    }

    updateCourse = () =>{
        this.getCourse();
    }
    updateAssignment = () =>{
        this.getAssignmnets();
    }
    updateStudent = () =>{
        this.getStudents();
    }

   
    

    componentDidMount(){
        this.getCourse();
        this.getAssignmnets();
        this.getStudents();

    }
       

    render(){

        // console.log('---------main assignment statate-----',this.state.assignments);

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


                <StudentSection
                    updateStudent={this.updateStudent}
                    students={this.state.students}
                    assignments={this.state.assignments}
                />

            </div>
            
        );
    }
}

export default Teacher;