import React, {createContext, useContext, useState} from 'react';
import {User} from "../entity/user";

export interface IUserContext {
    user:User,
    setUser: (u:User) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);



