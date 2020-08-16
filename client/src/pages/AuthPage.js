import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import React, { useState, useEffect, useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { set } from 'mongoose'

export const AuthPage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {load, request, error, clearError} = useHttp()
    const [form, setForm] = useState({login: '', pass: ''})
    const [isShowPass, setIsShowPass] = useState(false)
    const [valid, setValid] = useState({login: ' ', pass: ' ', isFormValid: false})

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
        let formValid = valid.isFormValid

        const trufalse = val => {
            if (val === ' ' || val === false) return false
            return val
        }

        switch (target) {
            case 'login':
                if (value===''){
                    loginValid = false
                }else{
                    loginValid = true
                } 
                break
            case 'pass':
                if (value.length < 6){
                    passValid = false
                }else{
                    passValid = true
                } 
                break
            default:
                break;
        }

        formValid = trufalse(loginValid) && trufalse(passValid)

        console.log(loginValid, passValid, formValid)

        return setValid({login: loginValid, pass: passValid, isFormValid: formValid})
    }

    const requestHendler = async () => {
        let data = await request('/api/auth/login', 'POST', {...form}, {})
        if(data){
            auth.login(data.token, data.userId)
        }
    }

    useEffect(() => {
      message(error);
      clearError()
    }, [error, message, clearError])

    return (
        <div className="row">
            <div className="col s12 m8 offset-m2 l8 offset-l2 ">
                <div className="card ">

                    <div className="row">
                        <div className="input-field col s10 offset-s1">
                        <i className="material-icons prefix">account_circle</i>
                        <input name="login" type="text" className={valid.login ? 'validate' : 'invalid'} 
                            value = {form.login}
                            onChange = {changeHandler}
                            onFocus = {focusValid}
                            />
                        <label className="active" htmlFor="login">login</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s10 offset-s1 ">
                        <i className="material-icons prefix"
                            onClick = {()=>setIsShowPass(!isShowPass)}
                            >
                            {isShowPass ? 'visibility' : 'visibility_off'}
                        </i>
                        <input 
                            name="pass" 
                            type={isShowPass ? 'text' : 'password'} 
                            className={valid.pass ? 'validate' : 'invalid'} 
                            onChange = {changeHandler}
                            onFocus = {focusValid}
                            />
                        <label className="active" htmlFor="pass">password</label>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn waves-effect waves-light col s10 offset-s1" 
                            disabled = {!valid.isFormValid} 
                            onClick = {requestHendler}>
                            Login
                        </button>
                    </div>

                    <div className="card-action" style = {{textAlign: 'right'}}>
                        <NavLink to='reg'  >
                            Create an account &gt;
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}