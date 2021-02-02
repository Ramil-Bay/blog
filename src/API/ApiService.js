export default class ApiService {
	apiURL = `https://conduit.productionready.io/api/`;

	async registration(user) {
		const obj = {
			user
		}

		const res = await fetch(`https://conduit.productionready.io/api/users`, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(obj)
		});

		const response = await res.json();

		console.log(response);
		return response;
	}

	async signIn(user) {
		const res = await fetch(`${this.apiURL}users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({user})
		})

		const response = await res.json();

		return response;
	}

	async getUserInfo(token) {
		const res = await fetch('https://conduit.productionready.io/api/user', {
			headers: {
				'Authorization': `Token ${token}`
			},
		})

		const response = await res.json();

		return response;
	}

	async updateUser(user, token) {
		const res = await fetch(`${this.apiURL}user`, {
			method: 'PUT', 
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`
			},
			body: JSON.stringify({user})
		})

		const response = await res.json();

		return response;
	}

	async createArticle(article, token) {
		const res = await fetch(`${this.apiURL}articles`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`
			},
			body: JSON.stringify({article})
		})

		const response = await res.json();

		return response;
	}

	async getArticles(token, username, offset = 0) {
		const res = await fetch(`${this.apiURL}articles?author=${username}&limit=10&offset=${offset}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`,
			}
		})

		const response = await res.json();

		return response;
	}

	async getArticle(slug, token) {
		const res = await fetch(`${this.apiURL}articles/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`,
			}
		});

		const response = await res.json();

		return response;
	}

	async deleteArticle(token, slug) {
		const res = await fetch(`${this.apiURL}articles/${slug}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`
			},
		});

		const response = await res.json();

		return response;
	}

	async updateArticle(article, token, slug) {
		const res = await fetch(`${this.apiURL}articles/${slug}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`
			},
			body: JSON.stringify({article}),
		});

		const response = await res.json();

		return response;
	}

	async favoriteArticle(slug, token, method) {
		const res = await fetch(`${this.apiURL}articles/${slug}/favorite`, {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8', 
				'Authorization': `Token ${token}`
			},
		})

		const response = await res.json();

		return response;
	}
		
}