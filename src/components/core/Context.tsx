import React from 'react';
import { useStorageState } from './useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export function SessionProvider(props: React.PropsWithChildren<{}>) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingJwtToken, jwtToken], setJwtToken] = useStorageState('jwtToken');
    const [[isLoadingRtToken, rtToken], setRtToken] = useStorageState('rtToken');

    const fetchNewTokens = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
        // Replace this with your actual API endpoint for token refresh
        const refreshTokenEndpoint = 'https://app-test.prometeochain.io/api/v1/auth/refreshToken';
        // refreshToken
        try {
            const response = await fetch(refreshTokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            return response.json();
        } catch (error) {
            throw new Error('Error refreshing token: ' + error.message);
        }
    };

    const refreshToken = async (): Promise<void> => {
        try {
            const storedRefreshToken = await AsyncStorage.getItem('rtToken');

            if (storedRefreshToken) {
                const { accessToken, refreshToken } = await fetchNewTokens(storedRefreshToken);

                setJwtToken(accessToken);
                setRtToken(refreshToken);
            } else {
                console.error('No refresh token found');
                signOut();
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            signOut();
        }
    };

    React.useEffect(() => {
        refreshToken();
    }, []);

    const setTokens = async (jwt: string, rt: string) => {
        try {
            setJwtToken(jwt);
            setRtToken(rt);
        } catch (error) {
            console.error('Error setting tokens:', error);
        }
    };

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
                    setSession('xxx');
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
function signOut() {
    throw new Error('Function not implemented.');
}

