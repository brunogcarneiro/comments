import React from 'react'
import Enzyme from 'enzyme'
import Events from 'events'
import App from './App'
import Comments from './Comments'
import NewComment from './NewComment';

describe('Testa App', () => {
    it('Testa sendComment', () => {
        const child = jest.fn().mockReturnValue({
            push: jest.fn().mockReturnValue({
                key: 'myKey'
            })
        })

        const update = jest.fn();

        const database = {
            ref: jest.fn().mockReturnValue({
                on: jest.fn(),
                child: child,
                update: update
            })
        }

        const comments = {
            'comments/myKey': {
                comment: 'Novo comentario'    
            }
        }

        const wrapper = Enzyme.shallow(<App database={database} />)

        wrapper.instance().addComment('Novo comentario')

        expect(child).toBeCalledWith('comments')
        expect(update).toBeCalledWith(comments)
    })

    it('testa componentDidMount', () => {
        const eventEmitter = new Events.EventEmitter()
        
        const ref = jest.fn();
        ref.mockReturnValue(eventEmitter)

        const database = {ref}

        const wrapper = Enzyme.shallow(<App database={database} />)

        //ainda não recebeu comentários
        expect(wrapper.find('Comments').length).toBe(1)
        expect(wrapper.find('NewComment').length).toBe(1)
        expect(wrapper.find('p').length).toBe(1)

        //recebeu comentários
        const val = jest.fn();
        const comments = {
            '1' : {comment: 'Comentario 1'},
            '2' : {comment: 'Comentario 2'},
            '3' : {comment: 'Comentario 3'}
        }
        val.mockReturnValue(comments)

        const snapshot = {val}
        eventEmitter.emit('value',snapshot)
        wrapper.update()

        expect(wrapper.state().comments).toBe(comments)
        expect(wrapper.state().isLoading).toBeFalsy()
        expect(wrapper.find(Comments).get(0).props.comments).toBe(comments)
        expect(wrapper.find('p').length).toBe(0)

        expect(wrapper.find(NewComment).length).toBe(1)
        expect(wrapper.find(NewComment).props().onClick).toBe(wrapper.instance().addComment)
    })
})
