import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {NodesPage} from './NodesPage'
import {DitailPage} from './DitailPage'
import {CreatePage} from './CreatePage'
import {RegistrationPage} from './RegistrationPage'
import {AuthPage} from './AuthPage'
// import {NodesContest, NodesContext} from '../context/AuthContext'

export const useRoutes = (isAuthenticated) =>  {
    if (isAuthenticated){
        return  (<Switch>
                    <Route path ="/notes" exact> 
                        <NodesPage/>
                    </Route>
                    <Route path ="/notes/:id" exact> 
                        <DitailPage/>
                    </Route>
                    <Route path ="/create" exact> 
                        <CreatePage/>
                    </Route>
                    <Redirect to = '/notes' />
                </Switch>)
    }
    return (
        <Switch>
            <Route path = "/reg" exact> 
                <RegistrationPage/>
            </Route>
            <Route path = '/auth' exact> 
                <AuthPage/>
            </Route>
            <Redirect to = '/auth' />
        </Switch>
    )
}