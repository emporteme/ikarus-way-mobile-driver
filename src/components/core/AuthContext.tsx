// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC = ({ children }: any) => {              // Later put normal type
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if user is authenticated
        checkAuthentication();
    }, []);

    // Function to check authentication status
    const checkAuthentication = async () => {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        setIsAuthenticated(!!jwtToken); // Set isAuthenticated based on presence of jwtToken
    };

    // Function to handle user login
    const login = async () => {
        // Perform login logic here
        // For example, if login is successful, set isAuthenticated to true
        setIsAuthenticated(true);
    };

    // Function to handle user logout
    const logout = async () => {
        // Perform logout logic here
        // For example, clear AsyncStorage and set isAuthenticated to false
        await AsyncStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
