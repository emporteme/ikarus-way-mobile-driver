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

    const api = axios.create({
        baseURL: 'https://app-test.prometeochain.io/api/v1/',
        timeout: 10000,
    });

    api.interceptors.request.use(
        async (config) => {
            if (jwtToken) {
                config.headers.Authorization = `Bearer ${jwtToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && error.response.status === 401 && rtToken) {
                try {
                    console.log("CHECK FOR RT")
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

                    // Retry the original request with the new token
                    error.config.headers.Authorization = `Bearer ${newJwtToken}`;
                    return axios.request(error.config);
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    throw refreshError;
                }
            }
            return Promise.reject(error);
        }
    );

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
