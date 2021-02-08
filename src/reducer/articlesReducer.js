const articlesData = {
	articles: null,
	articlesCount: null,
	article: null,
};

const articlesReducer = (state = articlesData, { type, payload }) => {
	switch (type) {
		case 'GET_ARTICLES':
			return {
				...state,
				articles: payload,
			};

		case 'GET_ARTICLES_COUNT':
			return {
				...state,
				articlesCount: payload,
			};

		case 'GET_ARTICLE':
			return {
				...state,
				article: payload,
			};

		default:
			return state;
	}
};

export default articlesReducer;
