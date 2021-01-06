import React from 'react';
import '../css/StudentSection.css'
import Axios from 'axios';



class StudentSection extends React.Component{
    constructor(){
        super();
        this.state = {
            assignments:[],
            all_assignment:{},
            current_student:'',
            show:false,
            grade:-1,
            // students:this.props.students
            
            
        }
    }
   

    setCurrentStudent = (e) =>{

        if(this.state.current_student)
        document.getElementById(this.state.current_student).style.display = 'none'

        this.setState({
                current_student:e.target.value,
                show:true
            },()=>{
                this.getAssignment();
                if(this.state.show){

                    document.getElementById(this.state.current_student).style.display = 'block'
                }
        
            }
        );
        
    }
   

    getAssignment = () =>{

           //all submitted assignment and their grades
           let assignments={};
           let promise1 = this.props.assignments.forEach((assignment => {
               let id = assignment._id;
               // console.log('id:  ',id);
   
               let topic = assignment.topic;
               let content = assignment.content
               assignments[id] = { 
                   topic :topic,
                   content:content,
                   show:false //show property to only subbmitted assignment by student
               }
           }),
           
           
           );
          
           //setting submitted assignment value to the assignment details

           let submitted_assignment = []

           
           
           let promise2 = this.props.students.forEach(student =>{
               if(student._id==this.state.current_student){
                   if(student.log.length>0){
                       student.log.forEach( log => {
                           //log.assignment is id of assignment submitted
                           if(assignments.hasOwnProperty(log.assignment)){
                               assignments[log.assignment]['grade']=log.grade;
                               assignments[log.assignment].show = true;
                               assignments[log.assignment].path = log.document
                               assignments[log.assignment].id = log._id


                               console.log(assignments[log.assignment]);

                                //pushing submitted assignment ot submitted_assignment array
                               submitted_assignment.push(assignments[log.assignment]);
                           }
                       });
                   }
               }
           })

           console.log('-----------------------hello-----------')
           
           Promise.all([promise1,promise2]).then(
               this.setState({
                   assignments:submitted_assignment,
                   all_assignment:assignments
               })
            
           );
   
   

    }

    getFile = (e) =>{

        Axios({
            method: "GET",
            url:`http://localhost:8000/teacher/get-file/?path=${e.target.value}`, 
            responseType: "blob",
            //Force to receive data in a Blob Format
            withCredentials:true
          })
            .then(response => {
              //Build a URL from the file
              var file = new Blob([response.data], {type: 'application/pdf'});
              const fileURL = URL.createObjectURL(file);
              //Open the URL on new Window
              window.open(fileURL);
            })
            .catch(error => {
              console.log(error);
            });
  
  
    }

    setGrade = (e) =>{
        e.preventDefault();
        this.setState({
            grade:e.target.value
        })
        
    }

    giveGrade = (e) =>{
        if(this.state.grade!=-1){
                
            Axios({
                method: "POST",
                url:`http://localhost:8000/teacher/give-grades/?id=${e.target.value}&&grade=${this.state.grade}`,
                data:{
                    student:this.state.current_student,
                    grade:this.state.grade
                },

                withCredentials:true,
            }).then((res)=>{
                console.log(res.data,'---red data');
                this.setState({grade:-1}) //setting grade state to  default value after giving grades
                this.props.updateStudent();
                
                
            }).catch(err=>{console.log(err)});
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.students!=this.props.students){
            this.getAssignment();
        }
    }


    render(){
        

        let arr = [-1,0,1,2,3,4,5,6,7,8,9,10]
        console.log(this.state.grade,'--grade')
       
        return(
            <div className='student-section'>
             
                <h3>Student Section</h3>
                {this.props.students.map((student,index)=>(<div key={index}>

                    <button className="student-container"  value={student._id} onClick={this.setCurrentStudent}>
                        {student.name}
                    </button>


                    {/* this block will only be show for the current_student as it set by the clicked student name */}
                    <div  className= "submitted-assignment" id={student._id} >  
                       
                        <div className="submitted-assignment-heading" >{this.state.assignments.length?'Submitted Asigments':'No Submitted Asigments'}</div>
                        
                        {this.state.assignments.map((item,index)=>(<div className='assignment-detail' key={index}>
                            <div className="student-assignment" >
                                
                                    <div className='student-assignment-detail'>
                                        <button className='show-attached-file' onClick={this.getFile} value={item.path}>Show Attached File</button>

                                        <div className='student-assignment-topic'>
                                            <span><b>{item.topic}: </b></span>
                                            <span>{item.content}</span>
                                        </div>

                                    
                                    </div>

                                    <div className='assignment-detail-grade' >{item.grade===-1?   //check whether evaluated or not
                                        <div className='evalute' id={'show-'+this.state.current_student}>
                                            
                                            <select onChange={this.setGrade}>
                                                <option selected>-Grade-</option>
                                                {arr.map((item,index)=>(<option>{item}</option>))}
                                            </select>
                                            <button value={item.id} onClick={this.giveGrade}> Evaluate </button> 
                                        </div>
                                        :
                                        <div className='score'>
                                            {/* <h6>Score:</h6> */}
                                            <h3>{item.grade}</h3>

                                        </div>
                                    }</div>

                            </div>


                              
                                

                               
                        </div>))}
                    </div>

                </div>))}


                

              
            </div>
        );
    }
}

export default StudentSection;