import React from 'react'
import Enzyme from 'enzyme'

import Comments from './Comments'

it('should render', (() => {
    const comments = {
        0: {'comment': 'Comment 1'},
        1: {'comment': 'Comment 2'}
    }

    var wrapper = Enzyme.render(<Comments comments={comments} />)
    expect(wrapper.text()).toBe('Comment 1Comment 2')
}))

it('should render empty', () => {
    var wrapper = Enzyme.render(<Comments />)
    expect(wrapper.text()).toBe('')
})