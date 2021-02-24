import {
	ADD_ARTICLE_TAGS,
	ADD_NEW_TAG,
	DELETE_TAG,
	DELETE_ALL_TAG,
	CHANGE_TAG_VALUE,
	CHANGE_FOCUS,
	REPEAT_TAG,
	NOT_REPEAT_TAG,
} from '../actions/tagActions';

const tagsData = {
	tagCounter: 0,
	tags: [],
	tagValue: '',
	focus: false,
};

const tagsReducer = (state = tagsData, { type, payload }) => {
	switch (type) {
		case ADD_ARTICLE_TAGS:
			const newArr = payload.map((elem, i) => ({
				name: `tag${i}`,
				id: i,
				value: elem,
				repeat: false,
			}));
			return {
				...state,
				tags: newArr,
				tagCounter: newArr.length,
			};

		case ADD_NEW_TAG:
			const newTag = {
				name: `tag${state.tagCounter}`,
				id: state.tagCounter,
				value: payload,
				repeat: false,
			};
			return {
				...state,
				tags: [...state.tags, newTag],
				tagCounter: ++state.tagCounter,
			};

		case DELETE_TAG:
			const newArray = state.tags.filter((elem) => elem.id !== payload);
			return {
				...state,
				tags: newArray,
			};

		case DELETE_ALL_TAG:
			return {
				...state,
				tags: [],
				tagCounter: 0,
			};

		case CHANGE_TAG_VALUE:
			return {
				...state,
				tagValue: payload,
			};

		case CHANGE_FOCUS:
			return {
				...state,
				focus: payload,
			};

		case REPEAT_TAG:
			const newTagArr = state.tags.map((elem) => {
				if (elem.value === payload) {
					return {
						...elem,
						repeat: true,
					};
				}
				return elem;
			});
			return {
				...state,
				tags: newTagArr,
			};

		case NOT_REPEAT_TAG:
			const newNotRepeatTags = state.tags.map((elem) => ({
				...elem,
				repeat: false,
			}));
			return {
				...state,
				tags: newNotRepeatTags,
			};

		default:
			return state;
	}
};

export default tagsReducer;
