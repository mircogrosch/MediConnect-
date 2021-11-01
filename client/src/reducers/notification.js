import types from '../actions/types'
const initialState = { 
    notifications:[]
} 
const notification = (state=initialState,action)=>{
    switch(action.type){
        
        case types.SAVE_NOTIFICATION: 
        return { 
            ...state, notifications:[...state.notifications,action.payload]
        }
    default: 
    return state;
    }
} 

export default notification;