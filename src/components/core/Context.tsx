import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStorageState } from './useStorageState';

// Custom API Client with Interceptor
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const setJwtTokenRef = useRef(null);

const AuthContext = React.createContext<{
    signIn: (jwt: string, rt: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    jwtToken?: string | null;
    rtToken?: string | null;
    isLoadingJwtToken?: boolean;
    isLoadingRtToken?: boolean;
    setJwtToken: (token: string) => void;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    jwtToken: null,
    rtToken: null,
    isLoadingJwtToken: false,
    isLoadingRtToken: false,
    setJwtToken: () => null,
});

export const useAuth = () => React.useContext(AuthContext);

export function useSession() {
    const value = React.useContext(AuthContext);
    return {
        signIn: value.signIn,
        signOut: value.signOut,
        session: value.session,
        jwtToken: value.jwtToken,
        isLoading: value.isLoading,
    };
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingJwtToken, jwtToken], setJwtToken] = useStorageState('jwtToken');
    const [[isLoadingRtToken, rtToken], setRtToken] = useStorageState('rtToken');

    // Update the ref whenever the setJwtToken function changes
    useEffect(() => {
        setJwtTokenRef.current = setJwtToken;
    }, [setJwtToken]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (jwt: string, rt: string) => {
                    await setJwtToken(jwt);
                    await setRtToken(rt);
                    setSession('xxx');
                },
                signOut: async () => {
                    await AsyncStorage.removeItem('jwtToken');
                    await AsyncStorage.removeItem('rtToken');
                    setSession(null);
                },
                session,
                jwtToken,
                rtToken,
                isLoading,
                isLoadingJwtToken,
                isLoadingRtToken,
                setJwtToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}