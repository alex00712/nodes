import {useState, useCallback} from 'react'

export const useHttp = ()=>{
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)
    
    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
            setLoad(true)
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            try {
                let response = await fetch(url, {method, body, headers})
                let data = await response.json()
                if(!response.ok){
                    // throw new Error(data.message || 'something went wrong')
                    console.log(data.message || 'something went wrong')
                    setLoad(false)
                    return setError(data.message)
                }
                setLoad(false)
                return data
            } catch (error) {
                setLoad(false)
                console.log(error)
                setError(error.message)
                throw error
            }
        },
        [])
    
    const clearError = useCallback(()=>setError(null), [])
    return {load, request, error, clearError}
}