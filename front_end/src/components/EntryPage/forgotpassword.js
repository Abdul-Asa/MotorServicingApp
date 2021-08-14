import React, {useState} from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'    
import InputGroup from './InputGroup'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { PageHeader } from './entryPage'
// import './css/entryPage.css'

const Forgotpassword = () => {

    const [resetInfo, setResetInfo] = useState({
        email: ''
    })
    
    
    const handleInput = (e) =>{
        const {name, value} = e.target

        setResetInfo(inputDetails =>{
           return { ...inputDetails,
                   [name]: value
            }
        })
      
    }
      function validateForm() {
        return resetInfo.email.length > 0 ;
    }

    const submitLogin = (e) =>{
        e.preventDefault()
        setResetInfo({
        email: ''})
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
                <h3>Reset Password</h3>
                <p> Please enter the e-mail address associated with your Motorify account. We will send you a link to this e-mail address to reset your password. </p>
                <form >
                    <InputGroup>  
                        <Input name='email' value={resetInfo.email} onChange={handleInput} autoComplete='off' type="email" placeholder="Enter email" id="login-email" />
                    </InputGroup>


                    <Button type="submit"onClick={submitLogin} disabled={!validateForm()}>Reset Password</Button>
                   
                </form>
        
                    <Link to='/login'> Return to Login</Link> 
               
                
            </Card>
            </div>
        </>
    )
}

export default Forgotpassword
