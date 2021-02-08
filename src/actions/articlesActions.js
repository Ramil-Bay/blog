export const getArticles = (payload) => ({
	type: 'GET_ARTICLES',
	payload,
});

export const getArticlesCount = (payload) => ({
	type: 'GET_ARTICLES_COUNT',
	payload,
});

export const getArticle = (payload) => ({
	type: 'GET_ARTICLE',
	payload,
});
