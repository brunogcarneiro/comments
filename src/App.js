import React, { Component } from 'react'
import NewComment from './NewComment'
import Comments from './Comments'
import Login from './Login'

class App extends Component {
  state = {
    isLoading: true,
    comments: {}
  }

  addComment = (newComment) => {
    const id = this.props.database.ref().child('comments').push().key
    const comments = {}
    comments['comments/'+id] = {
      comment: newComment
    }

    this.props.database.ref().update(comments)
  }

  componentDidMount(){
    const comments = this.props.database.ref('comments')
    comments.on('value', snapshot => {
      this.setState({
        isLoading: false,
        'comments': snapshot.val()
      })
    })
  }

  render() {
    return (
      <div>
        <Login />
        <NewComment onClick={this.addComment} />
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
