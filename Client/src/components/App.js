import React from 'react';
import '../css/App.css';
import Header from './Header';
import Footer from './Footer';

import Login from './Login';
import Profile from './Profile';




class App extends React.Component {
  render(){
    return (
      <div className="app">
        <Header/>
        <div className='app-main'>
          <Login/>
          {/* <Profile/> */}
        </div>
        <Footer/>

      </div>
    );
  }
}

export default App;
