const user = {
	bio: null,
	email: null,
	image: null,
	token: null,
	username: null,
};
const reducer = (state = user, { type, payload }) => {
	switch (type) {
		case 'USER':
			return payload;

		default:
			return state;
	}
};

export default reducer;
