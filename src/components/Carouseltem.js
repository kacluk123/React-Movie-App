import React from "react";

class CarouselItem extends React.Component{

    randomMovie = (Title) =>{
        if (typeof this.props.movieChange === 'function'){

            this.props.movieChange(Title);

        }
    }

    render(){
        return  <div className='carDiv'><img class="carItem poster" onClick={e => this.randomMovie( this.props.name )} src={this.props.item} alt=""/></div>
    }
}

export default CarouselItem