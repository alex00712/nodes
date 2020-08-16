import React from 'react'

export const Preloader = ()=>{
    return (
        <div style = {{display: 'flex', justifyContent: 'center', marginTop: '30hv'}}>
            <div className="preloader-wrapper big active" >
                <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}