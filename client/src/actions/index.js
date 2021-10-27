import axios from 'axios'
import type from './types.js'
const URL= 'localhost:3001/'
export const getUser=(user)=> { 
    return async function(dispatch){
         const response = await axios.get(`${URL}login`); 
         dispatch({type:type.GET_USER_LOGIN, payload:response.data})
    }
}