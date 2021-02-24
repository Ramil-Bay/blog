import { ADD_DEFAULT_VALUE } from '../actions/defaultValueActions';

const defaultValue = {
	title: null,
	description: null,
	body: null,
	tagList: null,
	slug: null,
	author: null,
};

const defaultValueReducer = (state = defaultValue, { type, payload }) => {
	switch (type) {
		case ADD_DEFAULT_VALUE:
			return payload;

		default:
			return state;
	}
};

export default defaultValueReducer;
