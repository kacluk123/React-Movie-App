import React, { Component}  from 'react';
import firebase from "../firebase";
import CommentSection from "../components/CommentSection"
import MovieInfo from "../components/MovieInfo"
import Search from "../components/Search"
import UserInfo from "../components/UserInfo"
import UserPanel from "../components/UserPanel"
import Slider from "react-slick";

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
                <ExampleMovies data={this.state.data}/>
                <MovieInfo data={this.state.data} movieChange={this.otherMovie} dataSibling={this.state.arr}/>
                <CommentSection data={this.state.data} user = {this.state.user}/>
            </div>
        } else {
            return <div className="container">
                <UserInfo/>
                <Search valChange={this.textChange} movieFind={this.findMovie}/>
                <ExampleMovies data={this.state.data}/>
                <MovieInfo movieChange={this.otherMovie} data={this.state.data} dataSibling={this.state.arr}/>
                <CommentSection user = {this.state.user} data={this.state.data}/>
            </div>
        }

    }

}   class CarouselItem extends React.Component{

    render(){
        return  <div className='carDiv'><img class="carItem" src={this.props.item} alt=""/></div>
    }
}

    class ExampleMovies extends React.Component{
        constructor(props){
            super(props)
            this.state={
                otherList : [],
            }
        }
        componentDidMount(){
            this.setState({
                otherList: [{title:'wczytywanie'}]
            })
            const itemsRef = firebase.database().ref('Titles');

            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    otherList : Object.values(items),
                })

            })
        }


    render() {
        console.log(this.state.otherList);
        const list = this.state.otherList;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };


        if (this.props.data === ''){
            return <div className='carContainer marginList'>
                <h1 className='other'>Other users searched for:</h1>
                <Slider {...settings}>
                    {list.map(function (el, i) {
                        return <CarouselItem item={el.poster}></CarouselItem>
                    })}
                </Slider>
            </div>
        } else {
            return [];
        }

        }
    }

export default Movies;

