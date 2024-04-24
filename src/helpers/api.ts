import {useAuth} from "@/components/core/AuthContext";

export const fetchWithAuth = async (url:string, options: RequestInit, rtToken: string, setJwtToken:(token: string) => void) => {

	let response = await fetch(url,options);

	// If response status is 401 (Unauthorized), refresh token and retry
	if (response.status === 401) {
		const apiUrl = process.env.EXPO_PUBLIC_API_URL;
		const refreshResponse = await fetch(`${apiUrl}auth/refreshToken?rtToken=${rtToken}`, {
			method: 'POST',
		});

		if(!refreshResponse.ok){
			if(refreshResponse.status===500){
				throw new Error('server error');
			}
			throw new Error('response was not ok');
		}

		const json = await response.json();
		const jwtToken = json.data.jwt_token;

		setJwtToken(jwtToken)
		console.log('New JWT Token: ', jwtToken);
		// Fetch again
		response = await fetch(url, options);
	}


	return response;
};
