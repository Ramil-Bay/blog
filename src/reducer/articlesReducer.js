const articlesData = {
	addTagData: [],
	tagCounter: 0,
	articles: null,
	articlesCount: null,
	article: null,
	tags: [],
}

const articlesReducer = (state = articlesData, {type, payload}) => {
	switch (type) {
		case 'ADD_TAG': 
			return {
				...state, 
				addTagData: payload,
			}

		case 'COUNTER_INC': 
			return {
				...state,
				tagCounter: ++state.tagCounter,
			}	

		case 'RESET_COUNTER': 
			return {
				...state,
				tagCounter: 0,
			}

		case 'GET_ARTICLES':
			return {
				...state, 
				articles: payload,
			}

		case 'GET_ARTICLES_COUNT':
			return {
				...state,
				articlesCount: payload,
			}

		case 'GET_ARTICLE': 
			return {
				...state, 
				article: payload,
			}

		case 'ADD_ARTICLES_TAG': 
			const newArr = payload.map((elem, i) => ({name: `tag${i}`, id: i, value: elem}))
			return {
				...state, 
				tags: newArr,
				tagCounter: newArr.length
			}

		case 'ADD_NEW_TAG':
			const newTag = {name: `tag${state.tagCounter}`, id: state.tagCounter, value: ''}
			return {
				...state,
				tags: [...state.tags, newTag],
				tagCounter: ++state.tagCounter,
			}

		case 'DELETE_TAG': 
			const newArray = state.tags.filter(elem => elem.id !== payload);
			return {
				...state,
				tags: newArray,
			}

		case 'DELETE_ALL_TAG':
			return {
				...state, 
				tags: [],
				tagCounter: 0,
			}	

		default: return state;	
	}
}

export default articlesReducer;