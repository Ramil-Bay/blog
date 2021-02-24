import { ADD_USER_DATA } from '../actions/userActions';

const user = {
	bio: null,
	email: null,
	image: null,
	username: null,
};
const reducer = (state = user, { type, payload }) => {
	switch (type) {
		case ADD_USER_DATA:
			return payload;

		default:
			return state;
	}
};

export default reducer;
