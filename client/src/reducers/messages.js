import types from "../actions/types";

const initialState = {
    chat: []
}

export const messages = (state=initialState, action) => {
    switch(action.type){
        case types.GET_MESSAGE:
            return{
                ...state,
                chat: action.payload
            }
        default:
            return state
    }
}