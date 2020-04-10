import { Action } from '@ngrx/store';

export const APP_LOADER_TRUE = '[App] SetLoader';
export const APP_LOADER_FALSE = '[App] UnsetLoader';
export const APP_USER_SIGNUP = '[App] UserSignup';
export const APP_USER_LOGIN = '[App] UserLogin';
export const APP_USER_LOGOUT = '[App] UserLogout';

export const UNIVERSAL_CALC_RESULT_SET ="SET[UNIVERSAL_CALC_RESULT]";
export const UNIVERSAL_CALC_RESULT_CLEAR ="SET[UNIVERSAL_CALC_RESULT]";

export class AppSetLoader implements Action {

    readonly type = APP_LOADER_TRUE;

    constructor(public payload: any) {

    }
}


export class AppUnsetLoader implements Action {

    readonly type = APP_LOADER_FALSE;

    constructor(public payload: any) {

    }
}

export class UserSignup implements Action {

    readonly type = APP_USER_SIGNUP;

    constructor(public payload: any) {
    }
}


export class UserLogin implements Action {

    readonly type = APP_USER_LOGIN;

    constructor(public payload: any) {
    }
}

export class UserLogout implements Action {
    readonly type = APP_USER_LOGOUT;

    constructor() {

    }
}

export class SetUniversalCalcResult implements Action {
    readonly type = UNIVERSAL_CALC_RESULT_SET;

    constructor(public payload:any) {}
}











export type All = AppSetLoader | AppUnsetLoader | UserSignup
    | UserLogout | UserLogin
     ;
