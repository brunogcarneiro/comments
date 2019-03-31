import React, { Component } from 'react'
import NewComment from './NewComment'
import Comments from './Comments'
import Login from './Login'

class App extends Component {
  state = {
    isLoading: true,
    comments: {},
    isAuth: false
  }

  addComment = (newComment) => {
    const id = this.props.database.ref().child('comments').push().key
    const comments = {}
    comments['comments/'+id] = {
      comment: newComment
    }

    this.props.database.ref().update(comments)
  }

  login = async(email, password) => {
    try{
      await this.props.auth.signInWithEmailAndPassword(email, password)
      this.setState({isAuth: true})
    } catch(e) {
      console.log(e)
      this.setState({isAuth: false})
    }
    console.log(email + ' - ' + password)
  }

  componentDidMount(){
    const comments = this.props.database.ref('comments')
    comments.on('value', snapshot => {
      this.setState({
        isLoading: false,
        'comments': snapshot.val()
      })
    })

    this.props.auth.onAuthStateChanged( user => {
      if( user ){
        this.setState({ isAuth : true })
      }
    })
  }

  render() {
    return (
      <div>
        {
          this.state.isAuth 
            ? <NewComment onClick={this.addComment} />
            : <Login login={this.login}/>
        }
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
