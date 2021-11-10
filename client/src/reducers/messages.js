import types from "../actions/types";

const initialState = {
    chat: [],
    notificationChat: []
}

export const messages = (state=initialState, action) => {
    switch(action.type){
        case types.GET_MESSAGE:
            return{
                ...state,
                chat: action.payload
            }
        case 'SAVE_NOTIFICATION_CHAT':
            if(state.notificationChat.find(e => e.dniReciver === action.payload.dniReciver && e.personDni === action.payload.personDni)){
                return {...state}
            } else {
            return{
                ...state,
                notificationChat: [...state.notificationChat, action.payload]
            }}
        case types.GET_NOTIFICATIONS_MESSAGE:
            return{
                ...state,
                notificationChat: action.payload
            }
        default:
            return state
    }
}