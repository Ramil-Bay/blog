import ErrorHandlerService from './ErrorHandlerService';

export default class UniversalApiService {
	apiURL = `https://conduit.productionready.io/api/`;

	errorHandlerService = new ErrorHandlerService();

	async universalRequest(url, method, headers = null, body = null) {
		const res = await fetch(`${this.apiURL}${url}`, {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				...headers,
			},
			body,
		});

		if (!res.ok) {
			return this.errorHandlerService.errorHandler(res);
		}

		const response = await res.json();

		return response;
	}
}
