import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Articles from '../../containers/Articles';
import ArticlePageContainer from '../../containers/ArticlePageContainer';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import HeaderContainer from '../../containers/HeaderContainer';
import CreateArticle from '../../containers/CreateArticle';
import EditProfile from '../EditProfile';
import EditArticle from '../../containers/EditArticle';
import { addUserInfo } from '../../actions/userActions';
import PrivateRouter from '../PrivateRouter';

const Router = ({ addUserData, user }) => (
	<main>
		<BrowserRouter>
			<HeaderContainer />
			<Switch>
				<Route path="/articles/" exact component={Articles} />
				<Route
					path="/sign-up"
					render={() => <SignUp addUserInfo={addUserData} />}
				/>
				<Route
					path="/sign-in"
					render={() => <SignIn addUserInfo={addUserData} />}
				/>
				<PrivateRouter
					path="/profile"
					component={EditProfile}
					addUserInfo={addUserData}
					userInfo={user}
				/>

				<Route
					path="/articles/:slug"
					exact
					render={({ match }) => (
						<ArticlePageContainer slug={match.params.slug} />
					)}
				/>
				<PrivateRouter
					path="/articles/:slug/edit"
					component={EditArticle}
				/>
				<PrivateRouter
					exact
					path="/new-article"
					component={CreateArticle}
				/>
				<Redirect
					to={localStorage.getItem('token') ? '/articles' : 'sign-in'}
				/>
			</Switch>
		</BrowserRouter>
	</main>
);

const mapStateToProps = (state) => ({
	user: state.userReducer,
});

const mapDispatchToProps = {
	addUserData: addUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
