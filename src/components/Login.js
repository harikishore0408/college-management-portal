import React from 'react';
import '../css/Login.css'

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
                        <StudentSignIn/>
                        <TeacherSignIn/>
                    </div>
                   
                </div>
               
            </div>
        );
    }
}

export default Login;