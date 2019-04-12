import React from 'react'

const Comment = ({comment}) => {
    return (
        <div className='card mt-2'>
            <div className='card-body'>
            {comment.comment}
            <br />
            <span className='text-muted'>Enviado por: {comment.email}</span>
            </div>
        </div>
    )
}

export default Comment