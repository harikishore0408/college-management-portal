import React from 'react';
import Axios from 'axios';
class TeacherSignUp extends React.Component{

    constructor(){
        super();
        this.state ={
            email:'',
            name:'',
            subject:'',
            password:'',
            confirm_Password:''
        }
    }

    textToUpperCase = (e) => {
         //To convert first letter of everyword to Upper Case
         let str = e.target.value.toLowerCase()
         .split(' ')
         .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
         .join(' ');

         return str;
 
    }

    setEmail= (e) =>{
        this.setState({
            email:e.target.value
        });
    }
    setName = (e) =>{

        let str = this.textToUpperCase(e);

        this.setState({
            name:str
        });
    }
    setSubject = (e) =>{

       
        let str = this.textToUpperCase(e);

        this.setState({
            subject:str
        });
    }

    setPassword = (e) =>{
        this.setState({
            password:e.target.value
        });
    }
    setConfirmPassword = (e) =>{
        this.setState({
            confirm_password:e.target.value
        });
    }

    signUp = () =>{
        Axios({
            method: "POST",
           
            data: {
              name:this.state.name,
              email:this.state.email,
              subject:this.state.subject,
              password:this.state.password,
              confirmed_password:this.state.confirm_password

            },
            // withCredentials: true,
            url: "http://localhost:8000/teacher/create",
          }).then((res)=>{
              console.log(res.data);
        }).catch((error)=>{console.log(error)});
          
    }
    render(){
        return(
            <div className="teacher-sign-up">
                <h3>Teacher Registration</h3>
               
                <form >
                    
                    
                    <input type='text' name='name' placeholder='Enter ur name' onChange={this.setName} required/>
                    <input type='email' name='email' placeholder='Enter email' onChange={this.setEmail}required/>
                    <input type='text' name='subject' placeholder='Subject you teach' onChange={this.setSubject} required/>


                    <input type='password' name='password' placeholder='Enter Password' onChange={this.setPassword} required/>
                    <input type='text' name='confirm_password' placeholder='Confirm Password' onChange={this.setConfirmPassword} required/>
                    <input type='button' value='sign-up' onClick={this.signUp}/>


                </form>
            </div>
        );
    }
}

export default TeacherSignUp;