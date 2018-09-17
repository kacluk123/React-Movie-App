import React, { Component}  from 'react';
import UserPanel from "./UserPanel";

class MovieInfo extends React.Component{
    constructor(props){
        super(props)

    }
    otherMovie = (Title) =>{
        if (typeof this.props.movieChange === 'function'){

            this.props.movieChange(Title);

        }

    }
    render(){
        const meta = Number(this.props.data.Metascore);

        let background;
        if(meta <= 39 && meta >= 0 ){
            background = '#f00'
        } else if(meta <= 60 && meta >= 40){
            background = '#fc3'
        } else{
            background = '#6c3'
        }

        let movie = this.props.dataSibling

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        shuffleArray(movie)

        const slicedArray = movie.slice(0,4)


        const newMovie =  slicedArray.map((el, i) => {
            if (el.Poster !== "N/A"){
                return <li key={i} onClick={e => this.otherMovie( el )}   className="col3-3"><img src={el.Poster} alt=""/><span className="otherMovies">{el.Title}</span></li>

            } else {
                return <li key={i} onClick={e => this.otherMovie( el )} className="col3-3"><img src='https://jessica-chastain.com/news/wp-content/uploads/2016/07/noposter.jpg' alt=""/><span className="otherMovies">{el.Title}</span></li>

            }
        })


        if (this.props.data.Error === 'Something went wrong.'){
            return null;
        } else if (this.props.data.Error === "Movie not found!"){
            return <h1> Movie not found :(</h1>;

        }

        if (this.props.data !== ''){
            return <div className="container cont-pad">
                <div className="row">
                    <div className="col1-2">
                        <div className="posterBox"><img src={this.props.data.Poster} alt=""/></div>

                    </div>
                    <div className="col2-2">
                        <div className="scoreName">
                            <h1>{this.props.data.Title}({this.props.data.Year}) </h1>
                            <div className="scoreContainer">
                                <div className='metaScore' style={{background: background}}>{this.props.data.Metascore}</div>
                                <span className="score">CRITIC SCORE</span>
                            </div>
                        </div>

                        <span style={{fontSize: '20px'}}>{this.props.data.Genre}</span>
                        <p className="plot"> {this.props.data.Plot}</p>
                        <ul className="castContainer">
                            <li><span>Stars</span>: {this.props.data.Actors}</li>
                            <li><span>Director</span>: {this.props.data.Director}</li>
                            <li><span>Writer</span>: {this.props.data.Writer}</li>
                        </ul>
                    </div>

                </div>
                <h3 style={{fontSize : '25px', marginLeft: '10px'}}>Other movies:</h3>
                <div className="container center">

                    <ul className="movieList">{newMovie}</ul>

                </div>
            </div>
        } else {
            return null;
        }
    }
}
export default MovieInfo;