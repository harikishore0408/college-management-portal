import React from 'react';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';
import Axios from 'axios';
import Login from './Login';
import Profile from './Profile';
import userEvent from '@testing-library/user-event';




class App extends React.Component {


  constructor(){
    super();
    this.state={
      logged_In:false,
      profile:'',
      user:'No User'
    }
  }

  setLoginState = (login,profile,user)=>{
    console.log(profile,':',login);
    
    this.setState({
      logged_In:login,
      profile:profile,
      user:user
      
    })

 
      
    

    
    console.log(this.state.profile,':',this.state.logged_In);
  }

  
  // setUserName = () =>{ //on logout called
  //   this.setState({user:'No User'})
  // }

  componentDidMount(){
  
      Axios({
          method:'GET',
          url:'http://localhost:8000/user/get-user',
          withCredentials:true
      }).then((res)=>{
        console.log('-----',res.data)
        if(res.data.status)
          this.setState({
            logged_In:true,
            profile:res.data.profile,
            user:res.data.name
          })
      });

  }

  render(){
    return (
      <div className="app">

        <Header 
          loggedIn={this.state.logged_In} 
          user={this.state.user} 
          setLoginState={this.setLoginState}
        />

        <div className='app-main'>

          {!this.state.logged_In?
          <Login setLoginState ={this.setLoginState }/>
          :<Profile profile={this.state.profile}/>
          }
        

        </div>


        <Footer/>

      </div>
    );
  }
}

export default App;
