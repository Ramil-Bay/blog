import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = ({ user, addUserInfo, history, location }) => {
	const {
		main__header,
		main__heading,
		main__button,
		main__buttonActive,
		userImage,
		articleCreate,
		userName,
		logOut,
		heading__link,
	} = classes;

	const logOutClick = () => {
		localStorage.removeItem('token');
		addUserInfo({
			bio: null,
			email: null,
			token: null,
			username: null,
			image: null,
		});
		history.push('/sign-in');
	};

	const activeButton = `${main__button} ${main__buttonActive}`;

	const headerSignIn = (
		<>
			<Link
				to="/sign-in"
				className={
					location.pathname === '/sign-in'
						? main__button
						: activeButton
				}
			>
				Sign In
			</Link>
			<Link
				to="/sign-up"
				className={
					location.pathname === '/sign-up'
						? main__button
						: activeButton
				}
			>
				Sign Up
			</Link>
		</>
	);

	let headerButton;

	if (user) {
		if (user.token) {
			headerButton = (
				<>
					<Link to="/new-article" className={articleCreate}>
						Create article
					</Link>
					<Link to="/profile">
						<span className={userName}>{user.username}</span>
						<img
							src={
								user.image
									? user.image
									: '../../img/UserPhoto.png'
							}
							className={userImage}
							alt="user image"
						/>
					</Link>
					<button
						className={logOut}
						onClick={logOutClick}
						type="button"
					>
						Log Out
					</button>
				</>
			);
		} else headerButton = headerSignIn;
	} else headerButton = headerSignIn;

	return (
		<div className={main__header}>
			<Link to="/articles" className={heading__link}>
				<h1 className={main__heading}>Realworld Blog</h1>
			</Link>
			{headerButton}
		</div>
	);
};

export default withRouter(Header);
