import { Action } from '@ngrx/store';

export const USER_SIGNUP = '[Signup] Add';
export const USER_EDIT= '[Signup] Edit';


export class UserSignup implements Action {

    readonly type = USER_SIGNUP;

    constructor(public payload: any) {

    }
}


export class UserEdit implements Action {

    readonly type = USER_EDIT;

    constructor(public payload: any) {

    }
}


export type All = UserSignup | UserEdit;
