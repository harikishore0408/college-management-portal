import React from 'react';
import Axios from 'axios';
import '../css/TeacherDashboard.css';


class TeacherDashboard extends React.Component{
    
    constructor(){
        super();
        this.state = {
            topic:'',
        }
    }
    
    setTopic = (e) =>{
        this.setState({
            topic:e.target.value
        });
    }

    addTopic = (e) =>{
        Axios({
            method:"POST",
            url:`http://localhost:8000/teacher/add-topic/${this.state.topic}`,
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data);
            this.props.updateCourse();
        }).catch((error)=>{console.log(error)});
        
    }

    componentDidMount(){

        
    }

    
    render(){

        console.log('-------',this.props,'-----------')
        return(
            
            <div className='teacher-dashboard'>
                
                <h2>{this.props.course.subject}</h2>

                <form>
                    <input type='text' onChange={this.setTopic} name='topic' placeholder='Add Topic' />
                    <input type='button' onClick={this.addTopic} value='+'/>
                </form>

               {this.props.course.topics ? this.props.course.topics.map((item,index)=> (
                   <div className="topic-container" key={index}>
                       <p>{item}</p>
                   </div>
               )): <p>No Added Topic</p>}

            </div>
        );
    }
}

export default TeacherDashboard;