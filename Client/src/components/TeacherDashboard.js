import React from 'react';
import Axios from 'axios';


class TeacherDashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            list:[{}]

        }
    }

    componentDidMount(){
        Axios({
            method:'GET',
            url:'http://localhost:8000/teacher/assignment-list',
            withCredentials:true
        }).then(
            (res)=>{
                console.log(res.data);
                this.setState({list:res.data})
            })
        .catch((err)=>{console.log(err)});
    }


    
    render(){
        return(
            <div className='teacher-dashboard'>
                hello
               {this.state.list.map((item,index)=> (
                   <div className="assignmnet-container" key={index}>
                       <h6>Assignment</h6>
                       <p>{item.content}</p>
                       <small>{item.deadline}</small>
                   </div>
               ))}
            </div>
        );
    }
}

export default TeacherDashboard;