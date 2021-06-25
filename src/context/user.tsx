import React, {createContext, useContext, useState} from 'react';
import {User} from "../entity/User";

export interface IUserContext {
    user:User,
    loggedIn: Boolean;
}

export const UserContext = createContext({} as IUserContext);



