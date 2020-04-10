import * as AppActions from '../actions/app.actions';


export type Action = AppActions.All;


//
const defaultState: any = {
    loader: false,
    user: undefined,
  
};


// Creating new state from the previous state
const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};


export function appReducer(state: any, action: Action) {


    switch (action.type) {

        case AppActions.APP_LOADER_TRUE:
            return newState(state, { loader: true });

        case AppActions.APP_LOADER_FALSE:
            return newState(state, { loader: false });

        case AppActions.APP_USER_SIGNUP:
            return newState(state, { user: action.payload });

        case AppActions.APP_USER_LOGOUT:
            return newState(state, {
                loader: false,
                user: undefined,
               
            });

       
      



        default:
            return state;

    }
}

