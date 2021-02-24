export default class ErrorHandlerService {
	async errorHandler(res) {
		if (res.status === 422) {
			const response = await res.json();
			return response;
		}
		throw new Error(`received ${res.status}`);
	}
}
