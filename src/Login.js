import React, {Component} from 'react'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    
    updateState = (field) => (event) => {
        this.setState( { [field] : event.target.value } )
        console.log(this.state);
    }

    render(){
        return <div>
            <input type='text' onChange={this.updateState('email')} placeholder={this.state.email} />
            <input type='password' onChange={this.updateState('password')} placeholder={this.state.password} />
            <button onClick={() => this.props.login(this.state.email, this.state.password)}>Logar</button>
            <button onClick={this.props.onClick}>Ir para signup</button>
            {
                this.props.authErrorMessage && <p>{this.props.authErrorMessage}</p>
            }
        </div>
    }
}

export default Login;