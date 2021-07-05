import React, {createContext} from 'react';
import {User} from "../entity/User";

export interface IUserContext {
    user:User,
    loggedIn: Boolean;
    selectedAddress : string;
}

export const UserContext = createContext({} as IUserContext);



