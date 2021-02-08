export const addArticlesTag = (payload) => ({
	type: 'ADD_ARTICLES_TAG',
	payload,
});

export const addNewTag = () => ({
	type: 'ADD_NEW_TAG',
});

export const deleteTag = (payload) => ({
	type: 'DELETE_TAG',
	payload,
});

export const deleteAllTag = () => ({
	type: 'DELETE_ALL_TAG',
});
