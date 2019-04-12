import React, { Component } from 'react'
import NewComment from './NewComment'
import Comments from './Comments'
import Login from './Login'
import User from './User'
import SignUp from './SignUp'
import 'bootstrap-css-only'

class App extends Component {
  state = {
    isLoading: true,
    comments: {},
    isAuth: false,
    user: undefined,
    isSignUp: false,
    signUpErrorMessage: ''
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
      this.setState({
        isAuth: true,
        authErrorMessage: ''
      })
    } catch(e) {
      this.setState({
        isAuth: false,
        authErrorMessage: e.message
      })
    }
    console.log(email + ' - ' + password)
  }

  logout = () => {
    this.props.auth.signOut()
  }

  signup = async(email, password) => {
    try{
      await this.props.auth.createUserWithEmailAndPassword(email, password)
      this.setState({
        isSignUp: false,
        signUpErrorMessage: ''
      })
    } catch(e) {
      this.setState({
        isSignUp: true,
        signUpErrorMessage: e.message
      })
    }
  }

  setaTela = tela => (email, password) => {
    this.setState({isSignUp: tela == 'signup' })
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
      <div className='container mt-3'>
        {
          this.state.isAuth 
            ? [<User user={this.state.user} onLogout={this.logout}/>,
               <NewComment onClick={this.addComment} />]
            : (
                this.state.isSignUp
                  ? <SignUp signup={this.signup} signUpErrorMessage={this.state.signUpErrorMessage} onClick={this.setaTela('login')}/>
                  : <Login login={this.login} authErrorMessage={this.state.authErrorMessage} onClick={this.setaTela('signup')}/>
              )
        }
        <Comments comments={this.state.comments} />
        {this.state.isLoading && <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
