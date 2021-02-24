export const ADD_ARTICLES = 'ADD_ARTICLES';
export const ADD_ARTICLES_COUNT = 'ADD_ARTICLES_COUNT';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const CHANGE_GET_MY_ARTICLE = 'CHANGE_GET_MY_ARTICLE';
export const NEW_PAGE = 'NEW_PAGE';

export const addArticles = (payload) => ({
	type: ADD_ARTICLES,
	payload,
});

export const addArticlesCount = (payload) => ({
	type: ADD_ARTICLES_COUNT,
	payload,
});

export const addArticle = (payload) => ({
	type: ADD_ARTICLE,
	payload,
});

export const changeGetMyArticle = () => ({
	type: CHANGE_GET_MY_ARTICLE,
});

export const changeArticlesPage = (payload) => ({
	type: NEW_PAGE,
	payload,
});
