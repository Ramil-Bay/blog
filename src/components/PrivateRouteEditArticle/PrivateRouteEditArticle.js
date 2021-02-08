import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteEditArticle = ({ component: Component, title, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem('token') ? (
				title ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to="/articles" />
				)
			) : (
				<Redirect to="/sign-in" />
			)
		}
	/>
);

export default PrivateRouteEditArticle;
