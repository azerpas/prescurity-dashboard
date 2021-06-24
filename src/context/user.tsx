import React, {createContext, useContext, useState} from 'react';
import {User} from "../entity/user";

export interface IUserContext {
    user:User,
    loggedIn: Boolean;
}

export const UserContext = createContext({} as IUserContext);

export function getContext() : boolean | IUserContext{
    const iUserContext = useContext(UserContext);
    console.log(iUserContext);
    if(!iUserContext){
        return false;
    }else return iUserContext;
}



