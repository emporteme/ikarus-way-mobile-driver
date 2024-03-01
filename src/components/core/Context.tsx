// Context.tsx

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

// This hook can be used to access the user info.
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

    const refreshToken = async () => {
        try {
            const refreshToken = rtToken;
            if (refreshToken) {
                // Send a request to your server to refresh tokens
                const response = await fetch('YOUR_REFRESH_ENDPOINT', {
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

    const signIn = async (jwt: string, rt: string) => {
        try {
            await setJwtToken(jwt);
            await setRtToken(rt);
            setSession('xxx'); // Set the session as needed
        } catch (error) {
            console.error('Sign in error:', error);
            // Handle sign in error
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('jwtToken');
            await AsyncStorage.removeItem('rtToken');
            setSession(null);
        } catch (error) {
            console.error('Sign out error:', error);
            // Handle sign out error
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
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
