import React from "react";
import firebase from "../firebase";
import CarouselItem from "../components/Carouseltem"
import Slider from "react-slick";

class ExampleMovies extends React.Component{
    constructor(props){
        super(props)
        this.state={
            otherList : [],
        }
    }
    movieChange = (Title) =>{
        if (typeof this.props.movieChange === 'function'){

            this.props.movieChange(Title);

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
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        shuffleArray(list)

        const slicedArray = list.slice(0,5)


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
                    breakpoint: 450,
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
                    {slicedArray.map( (el, i) => {
                        return <CarouselItem key={i} name={el.title}item={el.poster} movieChange={this.movieChange}></CarouselItem>
                    })}
                </Slider>
            </div>
        } else {
            return [];
        }

    }
}

export default ExampleMovies