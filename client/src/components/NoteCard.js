import React, {useState, useEffect} from 'react'

export const NoteCard = (props) => {
  console.log(props)
  const [changable, setChangable] = useState(false)
  const [newState, setNewState] = useState() 
  const handleChange = (e) => {
    setNewState({...newState, [e.target.name]: e.target.value})
  }
  const updateOne = () =>{
    props.update({id: props.note._id, tytle: newState.data, data: newState.tytle, date: Date.now()})
  }
  useEffect(() => {
    if(props.note){
      setNewState({tytle: props.note.tytle, data: props.note.data})
    }
  }, [props.note])
  
    if(changable){
      return (
        <div>
            {props.note && 
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              {/* <span className="card-title" style = {{textAlign: 'center'}} >{props.note.tytle}</span> */}
                  <div className="row" style = {{textAlign: 'center'}}>
                    <div className="input-field col s6" >
                        <textarea id="textarea1" name = 'tytle' className="materialize-textarea" onChange = {handleChange}>{props.note.tytle}</textarea>
                        {/* <label>Tytle</label> */}
                      </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                        <textarea id="textarea2" name = 'data' className="materialize-textarea" onChange = {handleChange}>{props.note.data}</textarea>
                        {/* <label>Data</label> */}
                    </div>
                  </div>
                <p style = {{marginTop: '20px', fontSize: '10px', textAlign: 'right'}} >{new Date(parseInt(props.note.date)).toLocaleString()}</p>
            </div>
            <div className="card-action" >
                <button className="btn waves-effect waves-light green accent-4 center" onClick = {updateOne}>Save
                    <i className="material-icons right">attachment</i>
                </button>
            </div>
          </div>
        </div>
            }
      </div>
)
    }
    return (
            <div>
                {props.note && 
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title" style = {{textAlign: 'center'}} >{props.note.tytle}</span>
                  <hr/>
                    <p>{props.note.data}</p>
                    <p style = {{marginTop: '20px', fontSize: '10px', textAlign: 'right'}} >{new Date(parseInt(props.note.date)).toLocaleString()}</p>
                </div>
                <div className="row" >

                    <div className = 'col s6 center' style = {{marginBottom: '10px'}} >
                      <button className="btn waves-effect waves-light lime darken-3" onClick = {()=>{setChangable(true)}}>Change
                          <i className="material-icons right">border_color</i>
                      </button>
                    </div>

                    <div className = 'col s6 center' style = {{marginBottom: '10px'}} >
                      <button className="btn waves-effect waves-light red accent-4 " onClick = {()=>{props.delete(props.note._id)}} >Delete
                          <i className="material-icons right">delete_sweep</i>
                      </button>
                    </div>

                </div>
              </div>
            </div>
                }
          </div>
    )
}
