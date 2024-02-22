import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
    try {
        const url = 'https://app-test.prometeochain.io/api/v1/users/profile';
        // const body = await request.json();
        // const credentials = {
        //     email: body.email,
        //     password: body.password
        // };

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInN1YiI6IkNBUlJJRVJzdXBlcmFkbWluQHByb21ldGVvLmlvIiwiaWF0IjoxNzA4NTg3OTI2LCJleHAiOjE3MDg1OTE1MjYsInRva2VuX3R5cGUiOiJqd3QifQ.Lg_XH6vtF8VxdXTx4iwdXmhPJmnDg1drK8jqFaACPfA'
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
