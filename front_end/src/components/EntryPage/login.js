import React, {useState} from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'    
import InputGroup from './InputGroup'
import { EntryPage, PageHeader } from './entryPage'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import loginAsync from '../../redux/actions/loginAction'
// import './css/entryPage.css'

const Login = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [inputType, setInputType] = useState('password')
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    
    
    const handleInput = (e) =>{
        const {name, value} = e.target

        setLoginInfo(inputDetails =>{
           return { ...inputDetails,
                   [name]: value
            }
        })
      
    }
      function validateForm() {
        return loginInfo.email.length > 0 && loginInfo.password.length > 0;
    }
    const state = useSelector(state => state.login)

    const submitLogin = (e) =>{
        e.preventDefault()
        dispatch(loginAsync(loginInfo))
        setLoading(state.isLoading)
        setError(state.error.data.message)
        setLoginInfo({
        email: '',
        password: ''})
    }

    return (
        <>
        <PageHeader to="/">
        <div className='logo'>  
                <span className='color'> Motorify 
                <i className='fas fa-car' />  
                </span>
        </div>
      </PageHeader>
        <div className='flex'>
            <Card>
                <h3>Login</h3>


                <form >
                    <InputGroup>  
                        <Input name='email' value={loginInfo.email} onChange={handleInput} autoComplete='off' type="email" placeholder="Enter email" id="login-email" />
                    </InputGroup>

                    <InputGroup>  
                    <div className="flex3">
                     <div className="label-eye-wrapper">
                         {inputType === 'password' ? (
                          <AiOutlineEye onClick={() => setInputType('text')} />
                            ) : (
                            <AiFillEye onClick={() => setInputType('password')} />
                                 )}
                        </div>
                     </div>
                        <Input name='password' value={loginInfo.password} onChange={handleInput} autoComplete='off' type="password" placeholder="Enter password" id="login-password" />
                    </InputGroup>
                      
                    {!loading ? <h2> {error && JSON.stringify(error)} </h2> : <h2> Loading...</h2>} 

                    <div className='flex3'>  <Link to='/forgot-password'>  Forget your password?  </Link> </div>

                    <Button type="submit"onClick={submitLogin} disabled={!validateForm()}>Login</Button>

                   
                </form>
                <span>
                    Don't have an account? 
                    <Link to='/sign-up'>  Signup</Link> 
                </span>
                
            </Card>
            </div>
    </>
    )
}

export default Login
