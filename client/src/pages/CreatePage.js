import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const CreatePage = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [note, setNote] = useState({tytle: '', text: ''})

    const handleChange = e =>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handlerCreation = async () => {
            if (note.tytle && note.text){
                try {
                    let data = await request(
                            '/api/notes/create', 
                            'POST', 
                            {data: note.text, tytle: note.tytle}, 
                            {'Authorization': `Bearer ${auth.token}`})
                    console.log('without a picture')
                    history.push(`/notes/${data.data._id}`)
                } catch (error) {} 
            }
              
    }

    const handlerChangeFile = (e) => {
        console.log(e.target.files[0])
        setNote({...note, file: e.target.files[0]})
    }

    return (
        <div>
            <div  style = {{textAlign: 'center', fontSize: '2rem', paddingTop: '10px'}}>
                Create new note
            </div>
            <div className = 'border teal lighten-5' >
            <div className="row">
                    <div className="input-field col s6">
                    <textarea id="textarea1" name = 'tytle' className="materialize-textarea" onChange = {handleChange}></textarea>
                    <label>TYTLE</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                    <textarea id="textarea2" name = 'text' className="materialize-textarea" onChange = {handleChange}></textarea>
                    <label>Text</label>
                    </div>
                </div>
                
                <div style = {{textAlign: 'center'}}>
                    <button className="btn waves-effect waves-light col s2 offset-5s" onClick = {handlerCreation}>Create
                        <i className="material-icons right">add_to_photos</i>
                    </button>
                </div>
            </div>
        </div>
    )
}