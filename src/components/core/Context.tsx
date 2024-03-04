import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
    signIn: (jwt: string, rt: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    jwtToken?: string | null;
    rtToken?: string | null;
    isLoadingJwtToken?: boolean;
    isLoadingRtToken?: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    jwtToken: null,
    rtToken: null,
    isLoadingJwtToken: false,
    isLoadingRtToken: false,
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

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.post(
                    'auth/refreshToken',
                    {},
                    {
                        baseURL: 'https://app-test.prometeochain.io/api/v1/',
                        headers: {
                            Authorization: `Bearer ${rtToken}`,
                        },
                    }
                );

                const newJwtToken = response.data.jwtToken;
                await setJwtToken(newJwtToken);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
        };

        const refreshInterval = setInterval(() => {
            if (rtToken) {
                refreshToken();
            }
        }, 2 * 60 * 60 * 1000); // Refresh every 2 hours

        return () => clearInterval(refreshInterval);
    }, [rtToken]);

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
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}
