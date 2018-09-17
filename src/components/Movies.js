import React, { Component}  from 'react';
import firebase from "../firebase";
import CommentSection from "../components/CommentSection"
import MovieInfo from "../components/MovieInfo"
import Search from "../components/Search"
import UserInfo from "../components/UserInfo"
import UserPanel from "../components/UserPanel"

class Movies extends Component {
    constructor(props){
        super(props)
        this.state={
            data :'',
            text:'',
            user: null,
            dataSibling: '',
            arr: [],

        }
    }
    authListener =()=> {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user});
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({user: null});
                localStorage.removeItem('user');
            }
        });
    }
    componentDidMount(){
        this.authListener()
    }
    textChange =(event)=>{
        this.setState({
            text: event,
        })
    };
    findMovie = () =>{
        fetch(`https://www.omdbapi.com/?t=${this.state.text.replace(/[^a-z0-9+]+/gi, '+')}&apikey=421967b0`)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    data : data,

                })
                this.findMovieSibling()
            });

    }

    otherMovie = (otherMovie) =>{

        this.setState({
            data : otherMovie,

        })


    }
    findMovieSibling = () =>{
        const dataY = Number(this.state.data.Year);
        this.setState({
            arr : [],
        })
        for(let i = dataY-10; i < dataY+10; i++){
            fetch(`https://www.omdbapi.com/?t=${this.state.text}+&y=${i}&apikey=421967b0`)

                .then(r => r.json())
                .then(data => {
                    if (data.Response !== 'False'){
                        this.setState({
                            arr : [...this.state.arr, data],

                        })
                    }

                });
        }

    }




    render() {

        if (this.state.user !== null){
            return <div className="container">
                <UserPanel user={this.state.user}/>
                <Search valChange={this.textChange} movieFind={this.findMovie} movieSiblings={this.findMovieSibling}/>
                <MovieInfo data={this.state.data} movieChange={this.otherMovie} dataSibling={this.state.arr}/>
                <CommentSection data={this.state.data} user = {this.state.user}/>
            </div>
        } else {
            return <div className="container">
                <UserInfo/>
                <Search valChange={this.textChange} movieFind={this.findMovie}/>
                <MovieInfo movieChange={this.otherMovie} data={this.state.data} dataSibling={this.state.arr}/>
                <CommentSection user = {this.state.user} data={this.state.data}/>
            </div>
        }

    }

}

export default Movies;