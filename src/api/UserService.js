import UniversalApiService from './UniversalServiceApi';

export default class UserService {
	universalApiService = new UniversalApiService();

	getUserInfo(token) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			'user',
			'GET',
			header
		);
		return response;
	}

	changeUserData(user, token) {
		const body = JSON.stringify({ user });
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			'user',
			'PUT',
			header,
			body
		);
		return response;
	}
}
