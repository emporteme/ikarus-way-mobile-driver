import React, { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStorageState } from './useStorageState';
import * as SecureStore from 'expo-secure-store';

// Custom API Client with Interceptor
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if we should attempt to refresh token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const rtToken = await SecureStore.getItemAsync('rtToken');
                const refreshTokenResponse = await axiosInstance.post('auth/refreshToken', { rtToken });

                if (refreshTokenResponse.status === 200) {
                    const newJwtToken = refreshTokenResponse.data.data.jwt_token;

                    // Store the new tokens securely
                    await SecureStore.setItemAsync('jwtToken', newJwtToken);
                    await SecureStore.setItemAsync('rtToken', refreshTokenResponse.data.data.rt_token);

                    // Update JWT token for the current Axios instance
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newJwtToken}`;

                    // Update the JWT token in the app's state
                    if (setJwtTokenRef.current) {
                        setJwtTokenRef.current(newJwtToken);
                    }

                    // Retry the original request with the new JWT token
                    originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);

                // If refresh also fails, sign out the user
                if (setJwtTokenRef.current) {
                    setJwtTokenRef.current(null);
                }
                await SecureStore.deleteItemAsync('jwtToken');
                await SecureStore.deleteItemAsync('rtToken');

                // Redirect or update state to sign out
                // e.g., signOut() if you have this function in the context or navigate to sign in page
            }
        }

        // Return any error which is not related to authentication
        return Promise.reject(error);
    }
);

const setJwtTokenRef = useRef(null);

const AuthContext = React.createContext<{
    signIn: (jwt: string, rt: string) => void;
    signOut: () => void;
    // session?: string | null;
    // isLoading: boolean;
    jwtToken?: string | null;
    rtToken?: string | null;
    isLoadingJwtToken?: boolean;
    isLoadingRtToken?: boolean;
    setJwtToken: (token: string) => void;
}>({
    signIn: () => null,
    signOut: () => null,
    // session: null,
    // isLoading: false,
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
        // session: value.session,
        jwtToken: value.jwtToken,
        // isLoading: value.isLoading,
    };
}

export function SessionProvider(props: React.PropsWithChildren) {
    // const [[isLoading, session], setSession] = useStorageState('session');
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
                    // setSession('xxx');
                },
                signOut: async () => {
                    await AsyncStorage.removeItem('jwtToken');
                    await AsyncStorage.removeItem('rtToken');
                    // setSession(null);
                },
                // session,
                jwtToken,
                rtToken,
                // isLoading,
                isLoadingJwtToken,
                isLoadingRtToken,
                setJwtToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}