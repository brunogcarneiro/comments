import React from 'react'

class NewComment extends React.Component {

    state = {
        newComment: ''
    }

    textAreaChange = (event) => {
        this.setState({newComment: event.target.value})
    }

    enviarClick  = () => {
        this.props.onClick(this.state.newComment);
        this.setState({newComment: ''})
    }

    render(){
        return (
            <div>
                <textarea value={this.state.newComment} onChange={this.textAreaChange}/>
                <button onClick={this.enviarClick}>Enviar</button>
            </div>
        )
    }
}

export default NewComment