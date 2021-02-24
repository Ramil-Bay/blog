import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../../components/Header';
import UserService from '../../api/UserService';
import { addUserInfo } from '../../actions/userActions';
import { changeGetMyArticle } from '../../actions/articlesActions';

import classes from './HeaderContainer.module.scss';

const HeaderContainer = ({
	userInfo,
	getMyArticles,
	addUserData,
	changeGetArticles,
	history,
	location,
}) => {
	const userService = new UserService();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			userService
				.getUserInfo(localStorage.getItem('token'))
				.then((res) => {
					const { bio, email, image, username } = res.user;
					addUserData({ bio, email, image, username });
				});
		}
	}, []);

	const logOutClick = () => {
		localStorage.removeItem('token');
		addUserData({
			bio: null,
			email: null,
			username: null,
			image: null,
		});
		history.push('/sign-in');
	};

	return (
		<div className={classes.header}>
			<Link to="/articles" className={classes.heading__link}>
				<h1 className={classes.header__header}>Realworld Blog</h1>
			</Link>
			<Header
				userInfo={userInfo}
				changeGetArticles={changeGetArticles}
				getMyArticles={getMyArticles}
				logOutClick={logOutClick}
				location={location}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userInfo: state.userReducer,
	getMyArticles: state.articlesReducer.getMyArticles,
});

const mapDispatchToProps = {
	addUserData: addUserInfo,
	changeGetArticles: changeGetMyArticle,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(HeaderContainer);
