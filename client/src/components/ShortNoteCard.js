import React from 'react'

import noteLogo from './../images/note.png'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const ShortNoteCard = (props) => {

    const {load, request} = useHttp()
    const history = useHistory()
    const handlRedirect = () =>{
        history.push(`/notes/${props.params._id}`)
    }

    const deleteNote = async (id) =>{
        request('/api/notes/', 'DELETE', {id}, {'Authorization': `Bearer ${props.token}`})
            .then(()=>{
                props.dispatch({
                    type: 'delete',
                    payload: id
                })
            })
            .catch((err)=>{console.log(err)})
    }

    const updateNote = async (id) =>{
        request('/api/notes/status', 'PUT', {id}, {'Authorization': `Bearer ${props.token}`})
            .then(()=>{
                props.dispatch({
                    type: 'update',
                    payload: id
                })
            })
            .catch((err)=>{console.log(err)})
    }

    return (
            <li
                style = {{listStyleType: 'none', backgroundColor: '#d6d6d6'}} 
                onClick = {handlRedirect} 
            >
            <div className="col s12 m8 offset-m2 l6 offset-l3">
                <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    <div className="col s2" style = {{minWidth: '80px'}} >

                        <img src={noteLogo} alt = "" className="circle responsive-img"/>

                    </div>

                    <div className="col s8">

                        <span className="black-text">
                            <span className="title" style = {{fontWeight: 'bold', overflowWrap: 'break-word'}} >{props.params.tytle}</span>
                            <p style = {{overflowWrap: 'break-word'}} >{props.params.data}</p>
                        </span>
                
                    </div>

                    <div className="col s1">
                        <i className={`material-icons ${props.params.checked?'checked_T':'checked_F'}`} 
                            style ={{ marginRight: '20px', cursor: 'pointer', border: '1px solid black', borderRadius: '3px'}} 
                                onClick = {(e)=>{
                                    e.stopPropagation()
                                    updateNote(props.params._id)
                                }}
                        >check</i>
                    </div>

                    <div className="col s1">
                        <i className="material-icons" style ={{cursor: 'pointer'}} 
                                onClick = {(e)=>{
                                    e.stopPropagation()
                                    deleteNote(props.params._id)
                                }}
                        >delete_sweep</i>
                    </div>

                </div>
                </div>
            </div>
            </li>
    )
}

// _id: "5e8e29afe12aff3830f728b1"
// owner: "5e8a4a4b844c6a0348a550db"
// tytle: "sadas"
// data: "sadasd"
// date: "1586375087570"