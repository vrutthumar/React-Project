import { getApi } from "../type/type";

export const apiReducer = (state = [],action) =>{
    switch(action.type){
        case getApi :{
            return action.data
        }
        default:{
            return state
        }
    
    }
}