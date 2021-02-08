import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import ArticlePage from '../ArticlePage';
import * as actions from '../../actions/articlesActions';
import ApiService from '../../API/ApiService';
import Spinner from '../Spinner';

const ArticleRender = ({ slug, articlesInfo, getArticle, history }) => {
	const apiService = new ApiService();

	useEffect(() => {
		apiService
			.getArticle(slug, localStorage.getItem('token'))
			.then((res) => getArticle(res))
			.catch(() => {
				history.push('/articles');
				message.error('This article was deleted');
			});

		return () => {
			getArticle(null);
		};
	}, [slug]);

	const likeArticle = (bool, articleSlug) => {
		const { favorited, favoritesCount } = articlesInfo.article.article;
		const favCount = bool ? favoritesCount - 1 : favoritesCount + 1;
		const newArticle = {
			article: {
				...articlesInfo.article.article,
				favorited: !favorited,
				favoritesCount: favCount,
			},
		};

		getArticle(newArticle);

		apiService.favoriteArticle(
			articleSlug,
			localStorage.getItem('token'),
			bool ? 'DELETE' : 'POST'
		);
	};

	const renderComponent = articlesInfo.article ? (
		<ArticlePage slug={slug} likeArticle={likeArticle} />
	) : (
		<Spinner />
	);

	return renderComponent;
};

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default compose(
	connect(mapStateToProps, actions),
	withRouter
)(ArticleRender);
