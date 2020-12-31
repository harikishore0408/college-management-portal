import React from 'react';
import Axios from 'axios';



class StudentDashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            subject:[],
            assigments:[],
            submitted:[]

        }
    }

    componentDidMount(){
        Axios({
            method:'GET',
            url:'http://localhost:8000/student/get-user',
            withCredentials:true
        }).then((res)=>{
            console.log('Student Details',res.data.user);
            this.setState({
                name:res.data.user.name,
                subject:res.data.user.subject
            })
        });
    }

    getAssignment= (e)=>{
        var subject  = e.target.value;
        
        Axios({
            method:'GET',
            url:`http://localhost:8000/student/assignments/${subject}`,
            withCredentials:true
        }).then(
            (res)=>{
                console.log('Assignment data for student',res.data);
                this.setState({assigments:res.data})
            })
        .catch((err)=>{console.log(err)});
    }

     submitAssignment= (e)=>{
        Axios({
            method:'POST',
            url:`http://localhost:8000/student/submit-assignment/?id=${e.target.value}&&student=${this.state.name}`,


            withCredentials:true
        })
        .then(
            (res)=>{
                console.log('Submission',res.data)
            }
        )
        .catch((err)=>{console.log(err)});
     }
    
    


    
    render(){
        let assigments = [];
        let submitted = [];
        
        this.state.assigments.forEach(assigment => {
            console.log('--length--',assigment.student.length)
            if(assigment.student.length>0){ 
            console.log(assigment.student, 'index: ',assigment.student.indexOf(this.state.name))

                if(assigment.student.indexOf(this.state.name)!=-1){
                    submitted.push(assigment);
            console.log('sub--',submitted)

                }
            }else assigments.push(assigment);
        });
        return(
            <div className='student-dashboard'>
                <h2>StudentDashboard</h2>

                <h1>{this.state.name}</h1>
                <ul>
                    {this.state.subject.map((subject,index)=>(<li key={index}>
                        <span>{subject}</span>
                        <button value={subject} onClick={this.getAssignment}>Get Assignment</button>
                        </li>))}

                </ul>

                <div>
                    <div>
                        <h3>Submitted Assignment</h3>
                        <ul>
                            {submitted.map((assigment,index)=>(<li key={index}>
                            <p>{assigment.content}</p>
                            </li>))}
                        </ul>
                        
                    </div>
                    <div>
                        <h3>Remaining Assignment</h3>
                        <ul>
                            {assigments.map((assigment,index)=>(<li key={index}>
                            <p>{assigment.content}</p>
                            <button value={assigment._id} onClick={this.submitAssignment}>Submit</button>
                            </li>))}
                        </ul>
                        
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default StudentDashboard;