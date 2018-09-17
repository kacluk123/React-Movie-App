import firebase from "../firebase";
import React, { Component}  from 'react';
import UserPanel from "./UserPanel";

class CommentSection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comments : '',
            commentsList: [],
            message :''

        }
    }
    addComment = (event) =>{
        this.setState({
            comments : event.target.value
        })
    }
    componentDidUpdate(){

        if (this.lastTitle !== this.props.data.Title){
            this.lastTitle = this.props.data.Title
            this.setState({
                commentsList: [{title:'wczytywanie'}]
            })
            const itemsRef = firebase.database().ref(this.props.data.Title.replace(/[^a-z0-9+]+/gi, '+'));

            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    commentsList : items ? Object.values(items):[],
                })

            })


        }


    }

    sendComment =()=>{
        const itemsRef = firebase.database().ref(this.props.data.Title.replace(/[^a-z0-9+]+/gi, '+'));
        console.log(this.props.data.Title.replace(/[^a-z0-9+]+/gi, '+'))
        this.setState({
            comments: '',

        })
        const comment = {
            title: this.state.comments,
            author : this.props.user.email,
        }

        if(comment.title.length > 100 || comment.title.length < 10){
            this.setState({
                message : 'Your comment must be between 10 and 100 characters',
            })
        } else {
            itemsRef.push(comment);
            this.setState({
                message : '',
            })
        }


    }

    render(){
        let message;
        let display;
        if(this.props.user === null){
            display = 'none'
            message = 'You must be logged in to post a comment.'
        } else {
            display = 'block'

        }
        const cmm = this.state.commentsList
        const newList = cmm.map((el, i) => {
            return <li key={i}><div className="commentLi"><div className='author'>{el.author}
            </div><div>{el.title}</div></div></li>
        })
        if (this.props.data.Error === 'Something went wrong.'){
            return null;
        } else if (this.props.data.Error === "Movie not found!") {
            return null;

        }


        if(this.props.data !== ''){
            return <div>

                <div className='container commentSection'><textarea style={{display: display}} value={this.state.comments} onChange={this.addComment} placeholder="Type a comment here" className='commentText'/>
                    <button className="searchButton" onClick={this.sendComment} style={{display: display}}>Add comment</button>
                    <h3>{message}</h3>
                </div>
                <div className="col1-1">
                    <h2>{this.state.message}</h2>
                    <div className="allComments">
                        <span>Comments: ({this.state.commentsList.length})</span>
                        <ul> {newList.reverse()} </ul>
                    </div>
                </div>
            </div>} else {
            return null;
        }



    }
}
export default CommentSection;