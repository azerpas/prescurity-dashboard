import { AlertStatus } from '@chakra-ui/react';
import {createContext} from 'react';

export interface IAlertContext {
    title: string;
    description: string;
    status?: AlertStatus;
}

export const AlertContext = createContext({} as IAlertContext);