import types from "../actions/types"

export const healthInsurances = (state=[], action) => {
    switch(action.type){
        case types.GET_HEALTHINSURANCES:
            return{
                ...state,
                names: action.payload.data
            }
        default: return state
    }
}