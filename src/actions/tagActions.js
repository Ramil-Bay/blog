export const addArticlesTag = (payload) => ({
	type: 'ADD_ARTICLES_TAG',
	payload,
});

export const addNewTag = (payload) => ({
	type: 'ADD_NEW_TAG',
	payload,
});

export const deleteTag = (payload) => ({
	type: 'DELETE_TAG',
	payload,
});

export const deleteAllTag = () => ({
	type: 'DELETE_ALL_TAG',
});

export const changeTagValue = (payload) => ({
	type: 'CHANGE_TAG_VALUE',
	payload,
});

export const changeFocus = (payload) => ({
	type: 'CHANGE_FOCUS',
	payload,
});

export const repeatTag = (payload) => ({
	type: 'REPEAT_TAG',
	payload,
});

export const notRepeatTag = () => ({
	type: 'NOT_REPEAT_TAG',
});
