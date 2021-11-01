import types from "../actions/types"

export const formPatient = (state=[], action) => {
    switch(action.type){
        case types.POST_PATIENT:
            return{
                ...state
            }
        default: return state
    }
}