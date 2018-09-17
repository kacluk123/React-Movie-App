import firebase from "../firebase";
import React, { Component}  from 'react';
import UserPanel from "./UserPanel";

class UserInfo extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }
    signup = () =>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)})
            .catch((error) => {
                console.log(error);
            })
    }

    login = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
        });
    }
    email = (event) =>{
        this.setState({
            email: event.target.value,
        })
    }
    password = (event) =>{
        this.setState({
            password: event.target.value,
        })
    }


    render(){
        return <div className="userDiv">
            <input placeholder="E-mail"className="userInput" value={this.state.email} onChange={this.email} type="text"/>
            <input className="userInput" placeholder="Password" value={this.state.password} onChange={this.password} type="password"/>
            <button className="searchButton" onClick={this.login}>Login</button>
            <button className="searchButton" onClick={this.signup}>Register</button>
        </div>
    }
}
export default UserInfo;