import React, { Component}  from 'react';
import UserPanel from "./UserPanel";
class Search extends React.Component{

    handleNameChange = (event) =>{
        if (typeof this.props.valChange === 'function'){
            this.props.valChange(event.target.value);
        }
    }
    findMovie = (e) =>{
        e.preventDefault()
        if (typeof this.props.movieFind === 'function'){
            this.props.movieFind();
        }
    }
    DataReset = () =>{
        if (typeof this.props.dataReset === 'function'){
            this.props.dataReset();
        }
    }
    render(){
        return <div className="searchDiv">
            <form onSubmit={this.findMovie} className='form'>
            <input className="searchInput" value={this.props.text} onChange={this.handleNameChange} type="text" placeholder="Type a movie title"/>
            <button className="searchButton">Search<i className="fas fa-film"></i></button>
            </form>
            <button className="searchButton searchPad" onClick={this.DataReset}>Home</button>
        </div>
    }
}
export default Search;
