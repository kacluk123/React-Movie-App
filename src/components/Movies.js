import React, { Component}  from 'react';
import firebase from "../firebase";
import CommentSection from "../components/CommentSection"
import MovieInfo from "../components/MovieInfo"
import Search from "../components/Search"
import UserInfo from "../components/UserInfo"
import UserPanel from "../components/UserPanel"
import ExampleMovies from '../components/ExampleMovies'
class Movies extends Component {
    constructor(props){
        super(props)
        this.state={
            data :'',
            text:'',
            user: null,
            dataSibling: '',
            arr: [],
            otherTitles: [],


        }
    }
    authListener =()=> {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
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
        this.items();
    }

    textChange =(event)=>{
        this.setState({
            text: event,
        })
    };
    items(){
        const itemsRef = firebase.database().ref('Titles');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            this.setState({
                otherTitles : Object.values(items),
            })
        });
    }
    findMovie = () =>{
        fetch(`https://www.omdbapi.com/?t=${this.state.text.replace(/[^a-z0-9+]+/gi, '+')}&apikey=421967b0`)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    data : data,


                })
                window.scrollTo(0, 0)
                this.findMovieSibling()

                const itemsRef = firebase.database().ref('Titles');
                let poster = this.state.data.Poster
                let title = this.state.data.Title.replace(/[^a-z0-9+]+/gi, '+')
                const arr = this.state.otherTitles;

                let movieTitle = {
                    title: title,
                    poster : poster,
                }
                const pos = arr.map(function(e) { return e.title; });
                if (pos.indexOf(title) === -1){
                    itemsRef.push(movieTitle)
                }

                console.log(pos)
            });
    }
    exampleMovie = (Title) => {
        fetch(`https://www.omdbapi.com/?t=${Title}&apikey=421967b0`)
                .then(r => r.json())
                .then(data => {
                    this.setState({
                        data : data,


                    })



                });

    }
    otherMovie = (otherMovie) =>{
        window.scrollTo(0, 0)
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
                <ExampleMovies data={this.state.data} movieChange={this.exampleMovie}/>
                <MovieInfo data={this.state.data} movieChange={this.otherMovie} dataSibling={this.state.arr}/>
                <CommentSection data={this.state.data} user = {this.state.user}/>
            </div>
        } else {
            return <div className="container">
                <UserInfo/>
                <Search valChange={this.textChange} movieFind={this.findMovie}/>
                <ExampleMovies data={this.state.data} movieChange={this.exampleMovie}/>
                <MovieInfo movieChange={this.otherMovie} data={this.state.data} dataSibling={this.state.arr}/>
                <CommentSection user = {this.state.user} data={this.state.data}/>
            </div>
        }

    }

}


export default Movies;

