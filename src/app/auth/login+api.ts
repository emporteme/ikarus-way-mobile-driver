import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
    const body = await request.json();

    return ExpoResponse.json({});
}
