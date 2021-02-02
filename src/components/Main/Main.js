import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Articles from '../Articles';
import ArticleRender from '../ArticleRender';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Header from '../Header';
import CreateArticle from '../CreateArticle';
import EditProfile from '../EditProfile';
import EditArticle from '../EditArticle';
import * as actions from '../../actions/userActions';
import ApiService from '../../API/ApiService';

import classes from './Main.module.scss';

const Main = ({ user, userInfo, history }) => {
	const apiService = new ApiService();

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token) {
			apiService.getUserInfo(token).
			then(res => {
				const {bio, email, image, token, username} = res.user;
				userInfo({bio, email, image, token, username})
			});
			console.log(localStorage.getItem('token'))
		}
	}, [ ])


	return (
		<main>
			<Router>
				<Header />
				<Route path="/articles/" exact component={Articles} />
				<Route path="/sign-up" component={SignUp} />
				<Route path="/sign-in" component={SignIn} /> 
				<Route path="/profile" component={EditProfile} />
				<Route path="/new-article" component={CreateArticle} />
				<Route path="/articles/:slug/edit" component={EditArticle} />
				<Route path="/articles/:slug" exact render={({ match }) => {
					return <ArticleRender slug={match.params.slug}/>
				}} />
			</Router> 
		</main>
	)
}

const mapStateToProps = (state) => ({
	user: state,
});

export default connect(mapStateToProps, actions)(Main);