import {createContext} from 'react';

export interface IAlertContext {
    title: string;
    description: string;
}

export const AlertContext = createContext({} as IAlertContext);