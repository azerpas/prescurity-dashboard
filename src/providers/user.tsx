import React, {createContext, useState} from 'react';

export const UserContext = createContext(null);

export default ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};



