import React from 'react'

const User = (props) => {
    const user = props.user
    return (
        <div>
            Logado como: {user.email} <button type='button' onClick={props.onLogout}>Sair</button>
        </div>
    )
}

export default User