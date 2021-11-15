import types from '../actions/types'
const initialState = { 
    notifications:[]
} 
const notification = (state=initialState,action)=>{
    switch(action.type){
        
        case types.SAVE_NOTIFICATION: 
            return { 
                ...state, 
                notifications:[action.payload]
            }
        case types.GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case types.DELETE_NOTIFICATIONS:
            let notification = state.notifications
            let filter = notification.filter(e => e.id !== action.payload)
            return {
                ...state,
                notifications: filter
            }
        case types.REJECT_NOTIFICATION:
            return{
                ...state
            }
        default: 
        return state;
    }
} 

export default notification;