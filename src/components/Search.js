import React, { Component}  from 'react';
import UserPanel from "./UserPanel";
class Search extends React.Component{

    handleNameChange = (event) =>{
        if (typeof this.props.valChange === 'function'){

            this.props.valChange(event.target.value);

        }

    }
    findMovie = () =>{
        if (typeof this.props.movieFind === 'function'){

            this.props.movieFind();

        }



    }



    render(){
        return <div className="searchDiv">
            <input className="searchInput" value={this.props.text} onChange={this.handleNameChange} type="text" placeholder="Type a movie title"/>

            <button onClick={this.findMovie} className="searchButton">Search<i className="fas fa-film"></i></button>
        </div>

    }


}
export default Search;