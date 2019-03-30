import React from 'react'
import Comment from './Comment'
import Enzyme from 'enzyme'

it('should render', () => {
    const comment = {
        comment: 'Comment test'
    }
    const wrapper = Enzyme.render(<Comment comment={comment} />)
    expect(wrapper.text()).toBe('Comment test')
})

it('should render empty', () => {
    const comment = {
        comment: ''
    }
    const wrapper = Enzyme.render(<Comment comment={comment} />)
    expect(wrapper.text()).toBe('')
})