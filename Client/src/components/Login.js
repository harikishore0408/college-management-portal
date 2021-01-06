import React from 'react';
import '../css/Login.css'
import Axios from 'axios'

import StudentSignUp from './StudentSignUp'
import TeacherSignUp from './TeacherSignUp'

import StudentSignIn from './StudentSignIn'
import TeacherSignIn from './TeacherSignIn'


class Login extends React.Component{
    constructor(){
        super()
        this.state={
            tab:true,
            
        }
    }

    changeTab = (e) =>{
        if(e.target.value=='teacher'){
            this.setState({tab:false})
        }else this.setState({tab:true})

    }

    getUser = () =>{

        console.log('----get---user')
        Axios({
            method:'GET',
            url:'http://localhost:8000/user/get-user',
            withCredentials:true
        }).then((res)=>{
            console.log(res)
            console.log('signed in as ',res.data.profile);
            this.props.setLoginState(true,res.data.profile,res.data.name);
        });
    }

    render(){
        return(
            <div className='login'>
                <div className='sign-up'>

                    <h1>Sign Up</h1>
                    <div id="tab">
                        <button value='student' className={this.state.tab?'selected-tab':'not-selected-tab'} onClick={this.changeTab}>As Student</button>
                        <button value='teacher' className={this.state.tab?'not-selected-tab':'selected-tab'} onClick={this.changeTab}>As Teacher</button>

                    </div>
                    <div id="sign-up-container">
                        {this.state.tab ? <StudentSignUp/> :<TeacherSignUp/>}
                        
                    </div>

                </div>
                <div className='sign-in'>
                    <h1>Sign In</h1>
                    <div id='sign-in-container'>
                        <StudentSignIn getUser={this.getUser}  />
                        <TeacherSignIn getUser={this.getUser}  />
                    </div>
                   
                </div>
               
            </div>
        );
    }
}

export default Login;