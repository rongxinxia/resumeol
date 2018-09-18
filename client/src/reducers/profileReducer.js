import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES
  } from '../actions/types';

const initialState ={
    profile:null,
    profiles:null,
    loading:false
}

const profileReducer=(state = initialState, actions)=>{
    switch(actions.type){
        case GET_PROFILE:
            return{
                ...state,
                profile:actions.payload,
                loading: false
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading:true
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile:null,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: actions.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer