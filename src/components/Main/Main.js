import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Articles from '../Articles';
import ArticleRender from '../ArticleRender';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Header from '../Header';
import CreateArticle from '../CreateArticle';
import EditProfile from '../EditProfile';
import EditArticle from '../EditArticle';
import * as actions from '../../actions/actions';
import ApiService from '../../API/ApiService';
import PrivateRouter from '../PrivateRouter';
import PrivateRouteEditArticle from '../PrivateRouteEditArticle';

const Main = ({
	addUserInfo,
	defaultValue,
	articlesInfo,
	getArticles,
	getArticlesCount,
	user,
	tagsInfo,
	deleteAllTag,
	addNewTag,
	deleteTag,
	addArticlesTag,
	getArticle,
	addDefaultValue,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
}) => {
	const apiService = new ApiService();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			apiService
				.getUserInfo(localStorage.getItem('token'))
				.then((res) => {
					const { bio, email, image, token, username } = res.user;
					addUserInfo({ bio, email, image, token, username });
				});
		}
	}, []);

	return (
		<main>
			<Router>
				<Header user={user} addUserInfo={addUserInfo} />
				<Switch>
					<Route
						path="/articles/"
						exact
						render={() => (
							<Articles
								userInfo={user}
								getArticles={getArticles}
								articlesInfo={articlesInfo}
								getArticlesCount={getArticlesCount}
							/>
						)}
					/>
					<Route
						path="/sign-up"
						render={() => <SignUp addUserInfo={addUserInfo} />}
					/>
					<Route
						path="/sign-in"
						render={() => <SignIn addUserInfo={addUserInfo} />}
					/>
					<PrivateRouter
						path="/profile"
						component={EditProfile}
						addUserInfo={addUserInfo}
						userInfo={user}
					/>

					<Route
						path="/articles/:slug"
						exact
						render={({ match }) => (
							<ArticleRender
								slug={match.params.slug}
								articlesInfo={articlesInfo}
								getArticle={getArticle}
								addDefaultValue={addDefaultValue}
								userInfo={user}
							/>
						)}
					/>
					<PrivateRouteEditArticle
						path="/articles/:slug/edit"
						component={EditArticle}
						title={defaultValue.title}
						tagsInfo={tagsInfo}
						addArticlesTag={addArticlesTag}
						deleteAllTag={deleteAllTag}
						deleteTag={deleteTag}
						addNewTag={addNewTag}
						defaultValue={defaultValue}
						changeTagValue={changeTagValue}
						changeFocus={changeFocus}
						repeatTag={repeatTag}
						notRepeatTag={notRepeatTag}
						addDefaultValue={addDefaultValue}
					/>
					<PrivateRouter
						exact
						path="/new-article"
						component={CreateArticle}
						tagsInfo={tagsInfo}
						deleteAllTag={deleteAllTag}
						deleteTag={deleteTag}
						addNewTag={addNewTag}
						changeTagValue={changeTagValue}
						changeFocus={changeFocus}
						repeatTag={repeatTag}
						notRepeatTag={notRepeatTag}
					/>
					<Redirect
						to={
							localStorage.getItem('token')
								? '/articles'
								: 'sign-in'
						}
					/>
				</Switch>
			</Router>
		</main>
	);
};

const mapStateToProps = (state) => ({
	user: state.userReducer,
	defaultValue: state.defaultValueReducer,
	articlesInfo: state.articlesReducer,
	tagsInfo: state.tagsReducer,
});

export default connect(mapStateToProps, actions)(Main);
