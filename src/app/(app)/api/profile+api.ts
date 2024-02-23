import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInN1YiI6IkNBUlJJRVJzdXBlcmFkbWluQHByb21ldGVvLmlvIiwiaWF0IjoxNzA4NjAwNTc3LCJleHAiOjE3MDg2MDQxNzcsInRva2VuX3R5cGUiOiJqd3QifQ.u7WVObeAFgUoHZ25uCwg7JYCJCyZLf5O970o7ipq8q4'
    try {
        const url = 'https://app-test.prometeochain.io/api/v1/users/profile';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            },
            // body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const json = await response.json();

        console.log(json);

        return ExpoResponse.json(json);
    } catch (error) {
        console.error('Error occurred:', error);
        return ExpoResponse.json({ error: error.message }, { status: 500 });
    }
}
