import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

const Header = ({
	userInfo,
	location,
	changeGetArticles,
	getMyArticles,
	logOutClick,
}) => {
	const {
		main__button,
		main__buttonActive,
		userImage,
		articleCreate,
		userName,
		logOut,
		myArticle,
	} = classes;

	const activeButton = `${main__button} ${main__buttonActive}`;

	const headerButton =
		userInfo && userInfo.username ? (
			<React.Fragment>
				<Link to="/articles">
					<button
						type="button"
						className={myArticle}
						onClick={() => changeGetArticles()}
					>
						{getMyArticles ? 'All articles' : 'My articles'}
					</button>
				</Link>
				<Link to="/new-article" className={articleCreate}>
					Create article
				</Link>
				<Link to="/profile">
					<span className={userName}>{userInfo.username}</span>
					<img
						src={
							userInfo.image
								? userInfo.image
								: '../img/UserPhoto.png'
						}
						className={userImage}
						alt="user image"
					/>
				</Link>
				<button className={logOut} onClick={logOutClick} type="button">
					Log Out
				</button>
			</React.Fragment>
		) : (
			<React.Fragment>
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
			</React.Fragment>
		);

	return headerButton;
};

export default Header;
