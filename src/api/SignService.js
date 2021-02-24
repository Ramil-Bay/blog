import UniversalApiService from './UniversalServiceApi';

export default class SignService {
	universalApiService = new UniversalApiService();

	signIn(user) {
		const body = JSON.stringify({ user });
		const response = this.universalApiService.universalRequest(
			'users/login',
			'POST',
			null,
			body
		);
		return response;
	}

	signUp(user) {
		const body = JSON.stringify({ user });
		const response = this.universalApiService.universalRequest(
			'users',
			'POST',
			null,
			body
		);
		return response;
	}
}
