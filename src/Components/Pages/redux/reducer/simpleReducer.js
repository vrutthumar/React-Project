import { add, deleteUser, edit } from "../type/type";

export const simpleReducer = (state = [], action) => {
    switch (action.type) {
        case add: {
            state.push(action.obj)
            return state
        }
        case edit: {
            state.splice(action.id, 1, action.obj)
            return state
        }
        case deleteUser: {
            state.splice(action.id, 1)

            return state
        }
        default: {
            return state
        }
    }
}