import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
    const body = await request.json();

    return ExpoResponse.json({});
}

export async function POST(request: ExpoRequest): Promise<ExpoResponse> {
    const url = 'https://app-test.prometeochain.io/api/v1/auth/authenticate';
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
    console.log(json);
    return ExpoResponse.json(json);

    // try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data);
    //     } else {
    //         console.error('Login failed');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    // }


}