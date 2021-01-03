import React from 'react';
import Axios from 'axios';



class StudentDashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            student_id:'',
            subject:[],
            assigments:[],
            submitted:[],
            remaining:[],


            current_subject:'',


            assigment_grades:{},
            logs:[],

            //uploaded assignment detail
            document:null,
            assigment_id:null //to match the correct  assignment is submitted

        }
    }


    setFile = (e) => {
        this.setState({
            assigment_id:e.target.name,
            document:e.target.files[0]
        })
    }
    

    getUser = ()=>{
        Axios({
            method:'GET',
            url:'http://localhost:8000/student/get-user',
            withCredentials:true
        }).then((res)=>{
            console.log('Student Details',res.data);
            this.setState({
                name:res.data.user.name,
                student_id:res.data.user._id,
                subject:res.data.user.courses,
                logs:res.data.user.log
            })
        });
    }

    componentDidMount(){
        this.getUser();
    }

    setCurrentSubject  = (e) => {
        let subject  = e.target.value;
        this.setState({current_subject:subject},() => this.getAssignment());
        
    }

    getAssignment = ()=>{
        console.log('hello')
        let subject = this.state.current_subject;
        Axios({
            method:'GET',
            url:`http://localhost:8000/student/assignments/${subject}`,
            withCredentials:true
        }).then(
            (res)=>{
                console.log('Assignment data for student',res.data);
                this.setState({assigments:res.data},() => {

                    let submitted=[];
                    let remaining=[];
                    this.state.assigments.forEach(assigment => {
                        if(assigment.students.length>0 && assigment.students.indexOf(this.state.student_id)!=-1){
                            submitted.push(assigment);
                        }else remaining.push(assigment);
                    });


                    Promise.all(submitted,remaining).then(this.setState({
                        submitted:submitted,
                        remaining:remaining
                    }))


                   
                });

               

            })
        .catch((err)=>{console.log(err)});
    }

    submitAssignment= (e)=>{

        // submit button should match the assignment uploaded id
        if(this.state.document && this.state.assigment_id == e.target.value){

            let data = new FormData()
            data.append('document',this.state.document);
            data.append('assignment_id',this.state.assigment_id);
            console.log(this.state.document,'-------',data)
            Axios({
                method:'POST',
                data,
                headers: {
                    'content-type': 'multipart/form-data'
                },
                url:`http://localhost:8000/student/submit-assignment/?id=${e.target.value}&&student=${this.state.name}`,
                withCredentials:true
            })
            .then(
                (res)=>{
                    console.log(res.data);
                    if(res.data.status)
                        this.getAssignment();

                })
            .catch((err)=>{console.log(err)});
            
        }


    }

    setAllSubmittedAssignmentDetail = (e) =>{

        let grades= {}
        this.state.logs.forEach(log => {
            let id = log._id;
            let grade = log.grade
            grades[id] = grade
        });
        
        Promise.all(grades).then(this.setState({assigment_grades:grades}));
        console.log(this.state.assigment_grades);


        
    }
    
    


    
    render(){
            console.log(this.state.submitted,'----',this.state.remaining)
            return(
            <div className='student-dashboard'>
                <h2>StudentDashboard</h2>
                <button onClick={this.setAllSubmittedAssignmentDetail}>Assignment Details</button>

                <h1>{this.state.name}</h1>
                <ul>
                    {this.state.subject.map((subject,index)=>(<li key={index}>
                        <span>{subject}</span>

                        <button value={subject} onClick={this.setCurrentSubject}>Get Assignment</button>
                        </li>))}

                </ul>

                <div>
                    <div>
                        <h3>Submitted Assignment</h3>
                        <ul>
                            {this.state.submitted.map((assigment,index)=>(<li key={index}>
                            <p>{assigment.content}</p>
                            <small></small>
                            </li>))}
                        </ul>
                        
                    </div>
                    <div>
                        <h3>Remaining Assignment</h3>
                        <ul>
                            {this.state.remaining.map((assigment,index)=>(<li key={index}>
                            <p>{assigment.content}</p>


                                <h1>File Upload</h1>
                                <input  name={assigment._id} type="file"  onChange= {this.setFile} />
                                <button value={assigment._id} onClick={this.submitAssignment}>Submit Assignment</button>

                            </li>))}
                        </ul>
                        
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default StudentDashboard;