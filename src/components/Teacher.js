import React from 'react';
import Axios from 'axios';
import TeacherDashboard from './TeacherDashboard';


class Teacher extends React.Component{
    constructor(){
        super();
        this.state = {
            content:'',
            deadline:'',

        }
    }
    setContent= (e) =>{
        this.setState({
            content:e.target.value
        });
    }
    setDeadline= (e) =>{
        this.setState({
            deadline:e.target.value
        });
    }

    addAssignment= ()=>{
        Axios({
            method:'POST',
            data:{
                content:this.state.content,
                deadline:this.state.deadline,
            },
            url:'http://localhost:8000/teacher/add-assignment',
            withCredentials:true

        }).then((res)=>{
            console.log(res);
      
      }).catch((error)=>{console.log(error)});
    }

    
    render(){
        return(
            <div className='teacher'>
                <form>
                    <textarea name='content' placeholder="enter question" onChange={this.setContent} required></textarea>
                    <label>
                        Deadline:
                        <input type='date' name='deadline' onChange={this.setDeadline} required/>
                    </label>
                    <input type='button' value='post' onClick={this.addAssignment}/>
                </form>
                <TeacherDashboard/>
            </div>
            
        );
    }
}

export default Teacher;