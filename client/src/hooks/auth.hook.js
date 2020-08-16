import {useEffect, useCallback, useState} from 'react'
const TOKEN = 'token'

export const useAuth = () =>{
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((token, id) => {
        setToken(token);
        setUserId(id);
        localStorage.setItem(TOKEN, JSON.stringify({token, id}))
        }, [])

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(TOKEN)
    }, [])

    useEffect(() => {
        let data = JSON.parse( localStorage.getItem(TOKEN) )
        if(data && data.token){
            login(data.token, data.id)
            setIsReady(true)
        }
    }, [login])

    return {login, logout, token, userId, isReady}
}