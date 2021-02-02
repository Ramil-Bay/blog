import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import classes from './Header.module.scss';
import * as actions from '../../actions/userActions';

const Header = ({user, userInfo, history, location}) => {

	const { main__header, main__heading, main__button, main__buttonActive, userImage, articleCreate, userName,
	logOut, heading__link } = classes;

	const logOutClick = () => {
		localStorage.removeItem('token');
		userInfo({ bio: null, email: null, token: null, username: null, image: null });
		history.push('/sign-in')
	}

	const activeButton = main__button + ' ' + main__buttonActive;

	const headerSignIn = (
		<React.Fragment>
			<Link to="/sign-in" className={ location.pathname === "/sign-in" ? main__button : activeButton }>Sign In</Link>
			<Link to="/sign-up" className={ location.pathname === "/sign-up" ? main__button : activeButton  }>Sign Up</Link>
		</React.Fragment>);

	let headerButton;

	if (user) {
		if (user.token) {
			headerButton = (
				<React.Fragment>
					<Link to="/new-article" className={ articleCreate }>Create article</Link>
					<Link to="/profile">
						<span className={ userName }>{user.username}</span>
						<img src={user.image ? user.image : '../../img/UserPhoto.png'} className={userImage}/>
					</Link>
					<button className={ logOut } onClick={logOutClick}>Log Out</button>
				</React.Fragment>);
		} else headerButton = headerSignIn;
	} else headerButton = headerSignIn;



	return (
		<div className={ main__header }>
			<Link to="/articles" className={ heading__link }>
				<h1 className={ main__heading }>Realworld Blog</h1>
			</Link>
			{headerButton}
		</div>
	)
}

const mapStateToProps = (state) => ({
	user: state.userReducer,
});

export default compose(connect(mapStateToProps, actions), withRouter)(Header);