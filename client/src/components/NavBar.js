import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../images/logo.png'
export const NavBar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = (e)=> {
        e.preventDefault()
        auth.logout()
    }
    return (
        <nav>
        <div className="nav-wrapper teal darken-3">
          <NavLink to="/" className="brand-logo left"><img src = {logo} alt ='logo'/></NavLink>
          <ul id="nav-mobile" className="right">
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/notes">Nodes</NavLink></li>
            {/* <li><NavLink to="/ditail">Ditails</NavLink></li> */}
            <li><NavLink to="/" onClick = {logoutHandler}>Logout</NavLink></li>
          </ul>
        </div>
      </nav>
    )
}