const tagsData = {
	tagCounter: 0,
	tags: [],
};

const tagsReducer = (state = tagsData, { type, payload }) => {
	switch (type) {
		case 'ADD_ARTICLES_TAG':
			const newArr = payload.map((elem, i) => ({
				name: `tag${i}`,
				id: i,
				value: elem,
			}));
			return {
				...state,
				tags: newArr,
				tagCounter: newArr.length,
			};

		case 'ADD_NEW_TAG':
			const newTag = {
				name: `tag${state.tagCounter}`,
				id: state.tagCounter,
				value: '',
			};
			return {
				...state,
				tags: [...state.tags, newTag],
				tagCounter: ++state.tagCounter,
			};

		case 'DELETE_TAG':
			const newArray = state.tags.filter((elem) => elem.id !== payload);
			return {
				...state,
				tags: newArray,
			};

		case 'DELETE_ALL_TAG':
			return {
				...state,
				tags: [],
				tagCounter: 0,
			};

		default:
			return state;
	}
};

export default tagsReducer;
