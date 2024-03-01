import React from 'react';
import { useStorageState } from './useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext<{
    // signIn: () => void;
    signIn: (jwt: string, rt: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    jwtToken?: string | null; // Define jwtToken and rtToken
    rtToken?: string | null;
    isLoadingJwtToken?: boolean; // Define isLoadingJwtToken and isLoadingRtToken
    isLoadingRtToken?: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    jwtToken: null, // Initialize jwtToken and rtToken as null
    rtToken: null,
    isLoadingJwtToken: false, // Initialize isLoadingJwtToken and isLoadingRtToken as false
    isLoadingRtToken: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    // if (process.env.NODE_ENV !== 'production') {
    //     if (!value) {
    //         throw new Error('useSession must be wrapped in a <SessionProvider />');
    //     }
    // }

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

    // Function to set JWT and refresh tokens
    const setTokens = async (jwt: string, rt: string) => {
        try {
            await setJwtToken(jwt);
            await setRtToken(rt);
        } catch (error) {
            console.error('Error setting tokens:', error);
        }
    };

    // Function to clear tokens
    const clearTokens = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            await AsyncStorage.removeItem('rtToken');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn: async (jwt: string, rt: string) => {
                    await setTokens(jwt, rt);
                    setSession('xxx'); // Set the session as needed
                },
                signOut: async () => {
                    await clearTokens();
                    setSession(null);
                },
                session,
                jwtToken,
                rtToken,
                isLoading,
                isLoadingJwtToken,
                isLoadingRtToken,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}