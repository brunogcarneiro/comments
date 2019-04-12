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
        return (
            <div>
                <h4>Entre para comentar</h4>
                <form className='form-inline'>
                    <input type='text' className='form-control' onChange={this.updateState('email')} placeholder={this.state.email} />
                    <input type='password' className='form-control ml-1' onChange={this.updateState('password')} placeholder={this.state.password} />
                    <button className='btn-primary ml-1' onClick={(e) => {
                        e.preventDefault()
                        this.props.login(this.state.email, this.state.password)
                    }
                    }>Logar</button>
                    <button className='btn ml-1' onClick={this.props.onClick}>Ir para signup</button>
                </form>
                {
                    this.props.authErrorMessage && <div className='card text-write bg-danger'>
                        <div className='card-body'>
                            {this.props.authErrorMessage}
                        </div>
                    </div>
                }
            </div>)
    }
}

export default Login;