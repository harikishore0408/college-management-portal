import React from 'react';
import Axios from 'axios';


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
                    <input type='text' onChange={this.setTopic} name='topic' placeholder='Create topic' />
                    <input type='button' onClick={this.addTopic} value='Add Topic'/>
                </form>
               {this.props.course.topics ? this.props.course.topics.map((item,index)=> (
                   <div className="topic-container" key={index}>
                       <p>{item}</p>
                   </div>
               )): ''}
            </div>
        );
    }
}

export default TeacherDashboard;