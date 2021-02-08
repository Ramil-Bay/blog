import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouter = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem('token') ? (
				<Component {...rest} {...props} />
			) : (
				<Redirect to="/sign-in" />
			)
		}
	/>
);

export default PrivateRouter;
