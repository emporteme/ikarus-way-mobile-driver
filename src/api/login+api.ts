import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save tokens
const saveTokens = async (jwtToken: string, rtToken: string) => {
    try {
        await AsyncStorage.setItem('jwtToken', jwtToken);
        await AsyncStorage.setItem('rtToken', rtToken);
        console.log('Tokens saved successfully');
    } catch (error) {
        console.error('Error saving tokens:', error);
    }
};

// Function to retrieve tokens
const getTokens = async () => {
    try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        const rtToken = await AsyncStorage.getItem('rtToken');
        return { jwtToken, rtToken };
    } catch (error) {
        console.error('Error getting tokens:', error);
        return null;
    }
};

export async function GET(request: ExpoRequest) {
    const body = await request.json();

    return ExpoResponse.json({});
}

export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
    const url = 'http://13.40.95.183:442/api/v1/auth/authenticate';
    const body = await request.json();
    const credentials = {
        email: body.email,
        password: body.password
    };

    const json = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(res => res.json());

    // Check if authentication is successful
    if (json.status === 'OK') {
        // Save tokens if authentication is successful
        const { jwt_token, rt_token } = json.data;
        saveTokens(jwt_token, rt_token);
    }

    return ExpoResponse.json(json);
}

// // Example usage in another API endpoint
// export async function AnotherEndpoint(request: ExpoRequest): Promise<ExpoResponse> {
//     // Retrieve tokens
//     const tokens = await getTokens();
//     if (!tokens || !tokens.jwtToken || !tokens.rtToken) {
//         // Handle case when tokens are not available or invalid
//         return ExpoResponse.json({ error: 'Tokens not found or invalid' });
//     }

//     // Use tokens for authentication in another request
//     const url = 'https://example.com/api/another_endpoint';
//     const { jwtToken, rtToken } = tokens;
//     const headers = {
//         'Authorization': `Bearer ${jwtToken}`,
//         'RT-Token': rtToken,
//         'Content-Type': 'application/json'
//     };

//     // Make request using the tokens
//     const response = await fetch(url, {
//         method: 'GET',
//         headers: headers
//     });
//     const responseData = await response.json();

//     // Handle response data accordingly
//     return ExpoResponse.json(responseData);
// }
