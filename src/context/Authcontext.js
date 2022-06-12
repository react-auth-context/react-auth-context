import { createContext } from 'react';
;

export const AuthContext = createContext({
    logedIng: false,
    user: {
        name: "san",
        email: "sinrandry@gmail.com"
    }
})