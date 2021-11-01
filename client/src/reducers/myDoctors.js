import types from "../actions/types"

export const myDoctors = (state=[], action) => {
    switch(action.type){
        case types.GET_MY_DOCTORS:
            return{
                ...state,
                names: action.payload
            }
        default: return state
    }
}