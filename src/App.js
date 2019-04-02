import React, { Component } from 'react'
import NewComment from './NewComment'
import Comments from './Comments'
import Login from './Login'
import User from './User'

class App extends Component {
  state = {
    isLoading: true,
    comments: {},
    isAuth: false,
    user: undefined
  }

  addComment = (newComment) => {
    const id = this.props.database.ref().child('comments').push().key
    const comments = {}
    comments['comments/'+id] = {
      comment: newComment,
      email: this.state.user.email,
      uid: this.state.user.uid
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

  logout = () => {
    this.props.auth.signOut()
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
      const newState = user
                      ? { isAuth : true , user }
                      : { isAuth : false, user : false }
      
      this.setState(newState)
    })
  }

  render() {
    return (
      <div>
        {
          this.state.isAuth 
            ? (
               [<User user={this.state.user} onLogout={this.logout}/>,
               <NewComment onClick={this.addComment} />]
              )
            : <Login login={this.login}/>
        }
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
