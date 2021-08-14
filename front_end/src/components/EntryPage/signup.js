import React, { useState, useEffect } from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import InputGroup from './InputGroup'
import { EntryPage, PageHeader } from './entryPage'
import { Link, useHistory } from 'react-router-dom'
import './css/entryPage.css'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import signupAsync from '../../redux/actions/signupAction.js'
import { useDispatch, useSelector } from 'react-redux'

const Signup = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [inputType, setInputType] = useState('password')

  const [signupInfo, setSignupInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const state = useSelector((state) => state.signup)
  // console.log(state)

  const handleInput = (e) => {
    const { name, value } = e.target

    setSignupInfo((inputDetails) => {
      return { ...inputDetails, [name]: value }
    })
  }

  const submitLogin = (event) => {
    event.preventDefault()
    event.stopPropagation()
    //call signup action
    console.log(dispatch(signupAsync(signupInfo)))
    setLoading(state.isLoading)
    setError(state.error.data.message)
    // setSignupInfo({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    //   repeatPassword: '',
    // })
  }

  //redirect users to service page after signup
  // useEffect(() => {
  //   if (!(state.signup_token === null )) {
  //     history.push('/services')
  //   }
  // }, [state])

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
        <h3>Sign up</h3>
        <form onSubmit={submitLogin}>
          <InputGroup>
            <Input
              name="firstName"
              value={signupInfo.firstName}
              onChange={handleInput}
              autoComplete="off"
              type="text"
              placeholder="Enter First Name"
              id="signup-firstname"
            />
          </InputGroup>

          <InputGroup>
  
            <Input
              name="lastName"
              value={signupInfo.lastName}
              onChange={handleInput}
              autoComplete="off"
              type="text"
              placeholder="Enter Last Name"
              id="signup-lastname"
            />
          </InputGroup>

          <InputGroup>
            <Input
              name="email"
              value={signupInfo.email}
              onChange={handleInput}
              autoComplete="off"
              type="email"
              placeholder="Enter a valid email"
              id="signup-email"
            />
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

            <Input
              name="password"
              value={signupInfo.password}
              onChange={handleInput}
              autoComplete="off"
              type={inputType}
              placeholder="Enter your password"
              id="signup-password"
            />
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
            <Input
              name="repeatPassword"
              value={signupInfo.repeatPassword}
              onChange={handleInput}
              autoComplete="off"
              type="password"
              placeholder="Confirm password"
              id="signup-confirmPassword"
            /> 
          </InputGroup>

          {!loading ? (
            <h2> {error && JSON.stringify(error)} </h2>
          ) : (
            <h2> Loading...</h2>
          )}

          <Button type="submit"> Sign Up </Button>
        </form>
        <span>
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>
      </Card>
    </div>
    </>
  )
  
}

export default Signup
