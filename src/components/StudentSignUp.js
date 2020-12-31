import React from 'react';
import Axios from 'axios';


class StudentSignUp extends React.Component{

    constructor(){
        super();
        this.state ={
            next:false,
            
            mongodb:false,
            expressjs:false,
            reactjs:false,
            nodejs:false,

            email:'',
            name:'',
            password:'',
            confirm_Password:'',
            subject:[]
        }
    }

    handleChangeCheck = (e) =>{

        let value = e.target.value;
        console.log('****',value)
        switch(value){
            case 'mongodb':
                if(this.state.mongodb){
                    this.setState({mongodb:false});
                }else this.setState({mongodb:true});
                break;
            case 'expressjs':
                if(this.state.expressjs){
                    this.setState({expressjs:false});
                }else this.setState({expressjs:true});
                break;
            case 'reactjs':
                if(this.state.reactjs){
                    this.setState({reactjs:false});
                }else this.setState({reactjs:true});
                break;
            case 'nodejs':
                if(this.state.nodejs){
                    this.setState({nodejs:false});
                }else this.setState({nodejs:true});
                break;
            default:
                break;
        }
       
        
    }
    handleNext = () =>{
        if(this.state.next){
            this.setState({next:false})
        }else this.setState({next:true})


    }
    
    setEmail= (e) =>{
        this.setState({
            email:e.target.value
        });
    }
    setName = (e) =>{
        this.setState({
            name:e.target.value
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
    setSubject = () =>{

        var arr = [];
        if(this.state.mongodb) {
            arr.push('MongoDB')
        }
        if(this.state.expressjs) {
            arr.push('ExpressJS')
        }
        if(this.state.reactjs) {
           arr.push('ReactJS')
        }
        if(this.state.nodejs) {
           arr.push('Nodejs')
        }

        this.setState({subject:arr})


    }

    signUp = () =>{

        

    //     Axios.post('http://localhost:8080/student/createsa',{
    //         name:this.state.name,
    //         email:this.state.email,

    //         password:this.state.password,
    //         confirmed_password:this.state.password

    //       })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

        
        Axios({
            method: "POST",
            // headers:{
            //     'Content-Type':'application/json;charset=UTF-8',
            //     "Access-Control-Allow-Origin":"*"
            // },
            data: {
              name:this.state.name,
              email:this.state.email,
              subject:this.state.subject,
              password:this.state.password,
              confirmed_password:this.state.confirm_password

            },
            // withCredentials: true,
            url: "http://localhost:8000/student/create",
          }).then((res)=>{
              console.log(res.data);
        
        }).catch((error)=>{console.log(error)});
          
    }

    render(){
        console.log(this.state.mongodb, 'mo');

        console.log(this.state.subject);



        let input;
        if(!this.state.next){
            input = <form>
                        <input type='text' name='name' placeholder='Name*' onChange={this.setName} required/>
                        <input type='email' name='email' placeholder='Email*' onChange={this.setEmail}required/>
                        <input type='password' name='password' placeholder='Password*' onChange={this.setPassword} required/>
                        <input type='text' name='confirm_password' placeholder='Confirm Password*' onChange={this.setConfirmPassword} required/>
                        <input type='button' value='next' onClick={this.handleNext}/>
                    </form>
        }else{
            input = <form>

                <label> MongoDB
                    <input type="checkbox" defaultChecked={this.state.mongodb} value='mongodb' onChange={this.handleChangeCheck} />
                </label>

                <label>  ExpressJS
                    <input type="checkbox" defaultChecked={this.state.expressjs} value='expressjs' onChange={this.handleChangeCheck} />
                </label>

                <label> ReactJS
                    <input type="checkbox" defaultChecked={this.state.reactjs} value='reactjs' onChange={this.handleChangeCheck} />
                </label>

                <label> NodeJS
                    <input type="checkbox" defaultChecked={this.state.nodejs} value='nodejs' onChange={this.handleChangeCheck} />
                </label>
                <input type='button' value='lock submission' onClick={this.setSubject}/>

                <input type='button' value='prev' onClick={this.handleNext}/>
                <input type='button' value='sign-up' onClick={this.signUp}/>


                

            </form>
        }

        return(
            <div className="student-sign-up">
                <h3>Student Registration</h3>
               
                        {input}
                     
                     

               

                
            </div>
        );
    }
}

export default StudentSignUp;