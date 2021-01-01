import React from 'react';
import Axios from 'axios';



class StudentSection extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[{}]
        }
    }
    componentDidMount(){
        Axios({
            method:"GET",
            url:'http://localhost:8000/teacher/get-students',
            withCredentials:true
        })
        .then((res)=>{
            console.log(res);
            this.setState({data:res.data});
      
      }).catch((error)=>{console.log(error)});
    }

   
    render(){
        console.log('---student section--',this.state.data)
        return(
            <div className='student-section'>
             
              <h3>Student Section</h3>
              {this.state.data.map((student,index)=>(
                  <div key={index}>
                      
                      {student.name}
                  </div>
        ))}

              
            </div>
        );
    }
}

export default StudentSection;