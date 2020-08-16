import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const RegistrationPage = () => {

    const message = useMessage()
    const auth = useContext(AuthContext)
    const {load, request, error, clearError} = useHttp()
    const [form, setForm] = useState({login: '', pass: '', confirmPass: ''})
    const [valid, setValid] = useState({login: ' ', pass: ' ', confirmPass: ' ', isFormValid: false})

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
        validateFunction(e.target.name, e.target.value)
    }

    const focusValid = e => {
        validateFunction(e.target.name, e.target.value)
    }

    const validateFunction = (target, value) => {
        let loginValid = valid.login
        let passValid = valid.pass
        let confirmPassValid = valid.confirmPass
        let isFormValid = valid.isFormValid

        const trueFalse = val => {
            if (val === ' ' || val === false) return false
            return true
        }

        switch (target) {
            case 'login':
                if(value === ''){
                    loginValid = false
                }else{
                    loginValid = true
                }
                break;

            case 'pass':
                if(value.length < 6){
                    passValid = false
                }else{
                    passValid = true
                }
                break;

            case 'confirmPass':
                if(value!== form.pass){
                    confirmPassValid = false
                }else{
                    confirmPassValid = true
                }
                break;  
            default:
                break;
        }
 
        isFormValid = trueFalse(loginValid) && trueFalse(passValid) && trueFalse(confirmPassValid)

        setValid({login: loginValid, pass: passValid, confirmPass: confirmPassValid, isFormValid: isFormValid})

    }

    const requestHendler = async () => {
        let data = await request('/api/auth/register', 'POST', {login: form.login, pass: form.pass}, {})
        if(data){
            console.log(data)
            message(data.message)
            setTimeout(()=>{
                auth.login(data.token, data.userId)
            }, 500)
        }
    }

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 ">
                <div className="card">

                    <div className="row">
                        <div className="input-field col s10 offset-s1">
                        <i className="material-icons prefix">account_circle</i>
                        <input name="login" type="text" className={valid.login ? 'validate' : 'invalid'} 
                            onChange = {changeHandler}
                            onFocus = {focusValid}
                            />
                        <label className="active" htmlFor="login">login</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s10 offset-s1 ">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                            name="pass" 
                            type='password'
                            className={valid.pass ? 'validate' : 'invalid'} 
                            onChange = {changeHandler}
                            onFocus = {focusValid}
                            />
                        <label className="active" htmlFor="pass">password</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s10 offset-s1 ">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                            name="confirmPass" 
                            type='password' 
                            className={valid.confirmPass ? 'validate' : 'invalid'} 
                            onChange = {changeHandler}
                            onFocus = {focusValid}
                            />
                        <label className="active" htmlFor="pass">confirm password</label>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn waves-effect waves-light col s10 offset-s1" 
                            disabled = {!valid.isFormValid} 
                            onClick = {requestHendler}>
                            Registrate
                        </button>
                    </div>

                    <div className="card-action" style = {{textAlign: 'right'}}>
                        <NavLink to='auth'>
                            Log in &gt;
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}