import UniversalApiService from './UniversalServiceApi';

export default class ArticlesService {
	universalApiService = new UniversalApiService();

	createArticle(article, token) {
		const header = { Authorization: `Token ${token}` };
		const body = JSON.stringify({ article });
		const response = this.universalApiService.universalRequest(
			'articles',
			'POST',
			header,
			body
		);
		return response;
	}

	getArticlesWithToken(token, offset = 0) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			`articles?limit=10&offset=${offset}`,
			'GET',
			header
		);
		return response;
	}

	getArticles(offset = 0) {
		const response = this.universalApiService.universalRequest(
			`articles?limit=10&offset=${offset}`,
			'GET'
		);
		return response;
	}

	getMyArticles(token, author, offset = 0) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			`articles?author=${author}&limit=10&offset=${offset}`,
			'GET',
			header
		);
		return response;
	}

	getArticleWithToken(slug, token) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			`articles/${slug}`,
			'GET',
			header
		);
		return response;
	}

	getArticle(slug) {
		const response = this.universalApiService.universalRequest(
			`articles/${slug}`,
			'GET'
		);
		return response;
	}

	favoriteArticle(slug, token, method) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			`articles/${slug}/favorite`,
			method,
			header
		);
		return response;
	}

	updateArticle(article, token, slug) {
		const header = { Authorization: `Token ${token}` };
		const body = JSON.stringify({ article });
		const response = this.universalApiService.universalRequest(
			`articles/${slug}`,
			'PUT',
			header,
			body
		);
		return response;
	}

	deleteArticle(token, slug) {
		const header = { Authorization: `Token ${token}` };
		const response = this.universalApiService.universalRequest(
			`articles/${slug}`,
			'DELETE',
			header
		);
		return response;
	}
}
