import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Preloader} from '../components/Preloader'
import {NoteCard} from '../components/NoteCard'

export const DitailPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request, load} = useHttp()
    const [note, setNote] = useState(null)
    const noteId = useParams().id

    const loadNote = useCallback(async () => {
            try {
                let data = await request(`/api/notes/${noteId}`, 'GET', null, {'Authorization': `Bearer ${auth.token}`})
                setNote(data)
            } catch (error) {}
        },
        []
    )

    useEffect(() => {
        loadNote()
        }, [auth.token, noteId, request])

    const deleteNote = async (id) =>{
        request('/api/notes/', 'DELETE', {id}, {'Authorization': `Bearer ${auth.token}`})
            .then(()=>{history.push('/notes')})
            .catch((err)=>{console.log(err)})
    }

    const updateNoteData = async (newData) =>{
        request('/api/notes/card', 'PUT', newData, {'Authorization': `Bearer ${auth.token}`})
            .then(()=>{loadNote()})
            .catch((err)=>{console.log(err)})
    }

    if(load){
        return <Preloader/>
    }

    return (
        <div>
           <NoteCard note = {note} delete = {deleteNote} update = {updateNoteData}/> 
        </div>
    )
}