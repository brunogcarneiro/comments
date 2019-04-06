import React, {Component} from 'react'

class SignUp extends Component {
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
            <button onClick={() => this.props.signup(this.state.email, this.state.password)}>Cadastrar</button>
            <button onClick={() => this.props.onClick()}>Ir para login</button>
            {
                this.props.signUpErrorMessage && <p>{this.props.signUpErrorMessage}</p>
            }
        </div>
    }
}

export default SignUp;