import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStorageState } from './useStorageState';

// Custom API Client with Interceptor
const apiClient = axios.create({
    baseURL: 'http://13.40.95.183:442/api/v1/',
});

// Create a global ref to store the setJwtToken function
const setJwtTokenRef = useRef(null);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { rtToken } = React.useContext(AuthContext);
                const response = await axios.post(
                    'auth/refreshToken',
                    {},
                    {
                        baseURL: 'http://13.40.95.183:442/api/v1/',
                        headers: {
                            Authorization: `Bearer ${rtToken}`,
                        },
                    }
                );

                const newJwtToken = response.data.jwtToken;
                setJwtTokenRef.current(newJwtToken); // Use the global ref to call setJwtToken
                originalRequest.headers.Authorization = `Bearer ${newJwtToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

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