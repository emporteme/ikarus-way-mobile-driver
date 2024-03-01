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

export const useAuth = () => React.useContext(AuthContext);

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


    const refreshToken = async () => {
        try {
            const refreshToken = rtToken;
            if (refreshToken) {
                // Send a request to your server to refresh tokens
                const response = await fetch('https://app-test.prometeochain.io/api/v1/auth/refreshToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${refreshToken}`,
                    },
                    // Include any necessary body parameters for token refresh
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const data = await response.json();
                    // Update tokens in storage
                    await setJwtToken(data.jwtToken);
                    return data.jwtToken; // Return refreshed JWT token
                } else {
                    // Handle refresh token failure
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

    const handleResponse = async (response: Response) => {
        if (response.status === 401) {
            try {
                const newToken = await refreshToken();
                // Retry the original request with the new token
                // Implement your logic here to retry the failed request
                // You might need to store and retry the request later
                return fetch(response.url, {
                    ...response,
                    headers: {
                        ...response.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            } catch (error) {
                // Handle token refresh error
                // Redirect to login or handle as needed
                console.error('Token refresh error:', error);
                throw error;
            }
        }
        return response;
    };

    // React.useEffect(() => {
    //     fetch.interceptors.response.use(handleResponse);
    // }, []);

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