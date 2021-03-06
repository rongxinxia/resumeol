import {GET_ERRORS} from '../actions/types'

const initialState = {};

const errorRuducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ERRORS:
            return{
                ...state,
                error:action.payload
            };
        default:
            return{
                ...state
            };
    }
}

export default errorRuducer;