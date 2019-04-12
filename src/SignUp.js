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
            <h4>Criar conta</h4>
            <form className='form-inline'>
                <input className='form-control' type='text' onChange={this.updateState('email')} placeholder={this.state.email} />
                <input className='form-control ml-1' type='password' onChange={this.updateState('password')} placeholder={this.state.password} />
                <button className='btn-primary ml-1' onClick={() => this.props.signup(this.state.email, this.state.password)}>Cadastrar</button>
                <button className='btn ml-1' onClick={this.props.onClick}>Ir para login</button>
                {
                    this.props.signUpErrorMessage && <p>{this.props.signUpErrorMessage}</p>
                }
            </form>
        </div>
    }
}

export default SignUp;