import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const refreshToken = async () => {
        try {
            const refreshToken = rtToken;
            if (refreshToken) {
                const response = await fetch('https://app-test.prometeochain.io/api/v1/auth/refreshToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const data = await response.json();
                    await setJwtToken(data.jwtToken);
                    return data.jwtToken;
                } else {
                    throw new Error('Token refresh failed');
                }
            } else {
                throw new Error('Refresh token not found');
            }
        } catch (error) {
            console.error('Error refreshing tokens:', error);
            throw error;
        }
    };

    const setTokens = async (jwt: string, rt: string) => {
        try {
            await setJwtToken(jwt);
            await setRtToken(rt);
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

    useEffect(() => {
        const interceptResponse = async (response: Response) => {
            if (response.status === 401) {
                try {
                    const newToken = await refreshToken();
                    const newHeaders = new Headers(response.headers);
                    newHeaders.set('Authorization', `Bearer ${newToken}`);
                    const newResponse = await fetch(response.url, {
                        ...response,
                        headers: newHeaders,
                    });
                    return newResponse;
                } catch (error) {
                    console.error('Token refresh error:', error);
                    throw error;
                }
            }
            return response;
        };

        const originalFetch = window.fetch;
        window.fetch = async (url: RequestInfo, config?: RequestInit): Promise<Response> => {
            try {
                const response = await originalFetch(url, config);
                return interceptResponse(response);
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        };

        return () => {
            window.fetch = originalFetch;
        };
    }, []);

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
