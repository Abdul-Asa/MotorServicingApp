import {combineReducers} from 'redux'
import { loginReducer } from './loginReducer'
import { signupReducer } from './signupReducer'
import { forgotpassword } from './forgotPasswordReducer'
import { services } from './servicesReducer'

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    forgotPassword: forgotpassword,
    services: services

    
})

export default rootReducer