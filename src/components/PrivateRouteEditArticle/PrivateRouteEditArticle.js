import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRouteEditArticle = ({
	location,
	component: Component,
	title,
	...rest
}) => {
	const url = location.pathname.split('/');
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('token') ? (
					<Component slug={url[2]} {...rest} {...props} />
				) : (
					<Redirect to="/sign-in" />
				)
			}
		/>
	);
};

export default withRouter(PrivateRouteEditArticle);
