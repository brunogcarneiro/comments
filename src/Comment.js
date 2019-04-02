import React from 'react'

const Comment = ({comment}) => {
    return (
        <div>
        Comentário: {comment.comment}
        <br />
        Enviado por: {comment.email}
        <hr />
        </div>
    )
}

export default Comment