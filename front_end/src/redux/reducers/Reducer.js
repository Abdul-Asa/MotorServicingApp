import {combineReducers} from 'redux'
import { loginReducer } from './loginReducer'
import { signupReducer } from './signupReducer'

const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer
})

export default rootReducer