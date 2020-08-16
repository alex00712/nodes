import React, {useState, useCallback, useContext, useEffect, useReducer} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { NodesContext } from '../context/NodesContext'
import { Preloader } from '../components/Preloader'
import { ShortNoteCard } from '../components/ShortNoteCard'

export const NodesPage = () => {

    const {state, dispatch} = useContext(NodesContext)
    const {load, request} = useHttp()
    const auth = useContext(AuthContext)


    const loadNotes = useCallback( async ()=>{
        let data = await request('/api/notes/', 'GET', null, {'Authorization': `Bearer ${auth.token}`})
        if (data){
            console.log(data.links)
            dispatch({
                type: 'load-all',
                payload: data.links
            })
        }
    }, [auth.token])

    useEffect(() => {
        console.log('do')
        loadNotes()
    }, [loadNotes])


    if(load===true){
        return <Preloader/>
    }
    console.log(state)
    return (
        
        <>
        {state.length !==0 ? 
        
                <TransitionGroup component = 'ui' >
                    {state.map(el => 
                                <CSSTransition 
                                    classNames = {'onenode'}
                                    appear = {true}
                                    timeout = {500}
                                    key = {el._id}
                                >
                                            <ShortNoteCard 
                                            params = {el} 
                                            dispatch = {dispatch}
                                            token = {auth.token}
                                            />
                                </CSSTransition>
                                            )}
                </TransitionGroup>  
            :

            <div className = 'row' >
                <div className = 'col s12 center'>
                        You have no node...
                </div>
            </div>

        }
        </>
    )
}