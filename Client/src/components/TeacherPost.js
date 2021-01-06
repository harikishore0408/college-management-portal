import React from 'react';
import '../css/TeacherPost.css'
import Axios from 'axios';


class TeacherPost extends React.Component{
    constructor(){
        super();
        this.state = {

            //assignment values to be sended when added
            topic:'',
            content:'',
            deadline:'',

        }
    }
    setTopic= (e) =>{
        this.setState({
            topic:e.target.value
        });
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
                topic:this.state.topic,
                deadline:this.state.deadline,
            },
            url:'http://localhost:8000/teacher/add-assignment',
            withCredentials:true

        }).then((res)=>{
            console.log(res);
            this.props.updateAssignment();
      
      }).catch((error)=>{console.log(error)});
    }

    

   
    render(){
        return(
            <div className='teacher-post'>
                <form>
                    <select onChange={this.setTopic} name="topics" required>
                        <option hidden value="none">Choose Topics</option>
                        {this.props.course.topics ? 
                        this.props.course.topics.map((topic,index) => (<option value={topic} key={index}>{topic}</option>)) : 
                        <option value='none'>No Topics</option>}
                        
                    </select>

                        
                    
                    <textarea name='content' rows='4' placeholder="enter question" onChange={this.setContent} required></textarea>
                    <input type='date' name='deadline' onChange={this.setDeadline} required/>
                    <input type='button' value='post' onClick={this.addAssignment}/>
                </form>

                <div className='assignment-container'>

                    {this.props.assignments.length ? 
                        this.props.assignments.map((item,index) => (<div key={index}>
                           <p> {item.content}</p>
                           <small>{item.deadline.slice(0,10)}</small>
                        </div>)) : 
                        <div >No Assignment Given</div>}
                        
                </div>
               
            </div>
            
        );
    }
}

export default TeacherPost;