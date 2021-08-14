import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/Reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [logger, thunk];

//get user from local storage and save in the store

const signupTokenFromLocalStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const loginTokenFromLocalStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  signup: {
    signup_token: signupTokenFromLocalStorage,
    data: {},
    isLoading: false,
    error: {
      data: {
        message: ""
      }
    }
  },
  login: {
    login_token: loginTokenFromLocalStorage,
    data: {},
    isLoading: false,
    error: {
      data: {
        message: ""
      }
    }
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
