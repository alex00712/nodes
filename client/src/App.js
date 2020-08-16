import React, {useReducer} from 'react';
import {BrowserRouter} from 'react-router-dom'
import {NavBar} from './components/NavBar'

import {Preloader} from './components/Preloader'
import {useRoutes} from'./pages/useRoutes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {NodesContext} from './context/NodesContext'
import {nodesReduser} from './redusers/NodesReduser'

import 'materialize-css'



function App() {
  const [state, dispatch] = useReducer(nodesReduser, [])

  const {login, logout, token, userId, isReady} = useAuth()
  let isAuth = !!token
  const routing = useRoutes(isAuth)
  // if (!isReady){
  //   return <Preloader/>
  // }
  return (
    <AuthContext.Provider value = {{login, logout, token, userId, isAuth}}>
      <NodesContext.Provider value = {{state, dispatch}}>
        <BrowserRouter>
          {isAuth && <NavBar/>}
            <div className = "container" >
              {routing}
            </div>    
        </BrowserRouter>
      </NodesContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
