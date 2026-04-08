import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export function GET(request: ExpoRequest) {
    return ExpoResponse.json({ hello: 'world' });
}

export function POST(request: ExpoRequest) {
    // Handle POST requests here
    return ExpoResponse.json({ message: 'Received POST request' });
}

export function PUT(request: ExpoRequest) {
    // Handle PUT requests here
    return ExpoResponse.json({ message: 'Received PUT request' });
}

export function DELETE(request: ExpoRequest) {
    // Handle DELETE requests here
    return ExpoResponse.json({ message: 'Received DELETE request' });
}

export function PATCH(request: ExpoRequest) {
    // Handle PATCH requests here
    return ExpoResponse.json({ message: 'Received PATCH request' });
}

export function HEAD(request: ExpoRequest) {
    // Handle HEAD requests here
    return ExpoResponse.json({ message: 'Received HEAD request' });
}

export function OPTIONS(request: ExpoRequest) {
    // Handle OPTIONS requests here
    return ExpoResponse.json({ message: 'Received OPTIONS request' });
}

export function TRACE(request: ExpoRequest) {
    // Handle TRACE requests here
    return ExpoResponse.json({ message: 'Received TRACE request' });
}

export function CONNECT(request: ExpoRequest) {
    // Handle CONNECT requests here
    return ExpoResponse.json({ message: 'Received CONNECT request' });
}