import React from 'react';
import Axios from 'axios';


class User extends React.Component{
    constructor(){
        super();
        this.state = {
            user:'No user'
        }
    }

    componentDidMount(){
         Axios({
                method:'GET',
                url:'http://localhost:8000/teacher/get-user',
                withCredentials:true
            }).then((res)=>{
                console.log(res);
                this.setState({user:res.data.name})
            });
          
        
    }

    getUser = () =>{
        Axios({
            method:'GET',
            url:'http://localhost:8000/student/get-user',
            withCredentials:true
        }).then((res)=>{
            console.log(res);
            this.setState({user:res.data.user.name})
        });
    }

    render(){
        return(
            <div className='user'>
                <h3>{this.state.user}</h3>
                <button onClick={this.getUser}>Get user</button>
            </div>
        );
    }
}

export default User;