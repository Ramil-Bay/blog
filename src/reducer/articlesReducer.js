import {
	ADD_ARTICLES,
	ADD_ARTICLES_COUNT,
	ADD_ARTICLE,
	CHANGE_GET_MY_ARTICLE,
	NEW_PAGE,
} from '../actions/articlesActions';

const articlesData = {
	articles: null,
	articlesCount: null,
	article: null,
	getMyArticles: false,
	articlePages: 1,
};

const articlesReducer = (state = articlesData, { type, payload }) => {
	switch (type) {
		case ADD_ARTICLES:
			return {
				...state,
				articles: payload,
			};

		case ADD_ARTICLES_COUNT:
			return {
				...state,
				articlesCount: payload,
			};

		case ADD_ARTICLE:
			return {
				...state,
				article: payload,
			};

		case CHANGE_GET_MY_ARTICLE:
			return {
				...state,
				getMyArticles: !state.getMyArticles,
			};

		case NEW_PAGE:
			return {
				...state,
				articlePages: payload,
			};

		default:
			return state;
	}
};

export default articlesReducer;
