import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from './firebase_config';

export const AuthContext = createContext();

const AuthProviderAprendev = ({ children }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
        console.log(subscriber);
        return () => subscriber(); // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProviderAprendev };
