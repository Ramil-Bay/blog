export const ADD_ARTICLE_TAGS = 'ADD_ARTICLE_TAGS';
export const ADD_NEW_TAG = 'ADD_NEW_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const DELETE_ALL_TAG = 'DELETE_ALL_TAG';
export const CHANGE_TAG_VALUE = 'CHANGE_TAG_VALUE';
export const CHANGE_FOCUS = 'CHANGE_FOCUS';
export const REPEAT_TAG = 'REPEAT_TAG';
export const NOT_REPEAT_TAG = 'NOT_REPEAT_TAG';

export const addArticleTags = (payload) => ({
	type: ADD_ARTICLE_TAGS,
	payload,
});

export const addNewTag = (payload) => ({
	type: ADD_NEW_TAG,
	payload,
});

export const deleteTag = (payload) => ({
	type: DELETE_TAG,
	payload,
});

export const deleteAllTag = () => ({
	type: DELETE_ALL_TAG,
});

export const changeTagValue = (payload) => ({
	type: CHANGE_TAG_VALUE,
	payload,
});

export const changeFocus = (payload) => ({
	type: CHANGE_FOCUS,
	payload,
});

export const repeatTag = (payload) => ({
	type: REPEAT_TAG,
	payload,
});

export const notRepeatTag = () => ({
	type: NOT_REPEAT_TAG,
});
