import firebase from "../firebase";
import React, { Component}  from 'react';
import App from "../App";

class UserPanel extends React.Component{
    logout = () => {
        firebase.auth().signOut();
    }
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <h3>Logged as {this.props.user.email} </h3>
                <button className="searchButton" onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default UserPanel;
