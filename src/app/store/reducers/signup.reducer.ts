import * as SignupActions from '../actions/signup.actions';


export type Action = SignupActions.All;



const defaultState: any = {
    _id: undefined,
     email: undefined,
    firstName: undefined,
    lastName:undefined,
    contactNo:undefined,
    agree:undefined,
    username:undefined  ,
    name:undefined,
    userType:undefined,
    type:undefined,
};


// Creating new state from the previous state
const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};


export function signupReducer(state: any, action: Action) {

    switch (action.type) {

        case SignupActions.USER_SIGNUP:
            return newState(state, { user: action.payload });

        default:
            return state;

    }
}

