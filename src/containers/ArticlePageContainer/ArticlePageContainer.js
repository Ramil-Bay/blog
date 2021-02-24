import React, { useEffect } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ArticlePage from '../../components/ArticlePage';
import ArticlesService from '../../api/ArticlesService';
import Spinner from '../../components/Spinner';
import { addArticle } from '../../actions/articlesActions';

const ArticlePageContainer = ({
	slug,
	article,
	saveArticle,
	history,
	username,
}) => {
	const articlesService = new ArticlesService();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			articlesService
				.getArticleWithToken(slug, localStorage.getItem('token'))
				.then((res) => saveArticle(res.article))
				.catch(() => {
					history.push('/articles');
					message.error('This article was deleted');
				});
		} else {
			articlesService
				.getArticle(slug)
				.then((res) => saveArticle(res.article))
				.catch(() => {
					history.push('/articles');
					message.error('This article was deleted');
				});
		}

		return () => {
			saveArticle(null);
		};
	}, [slug]);

	const likeArticle = (bool, articleSlug) => {
		const oldArticles = article;
		const { favorited, favoritesCount } = article;
		const favCount = bool ? favoritesCount - 1 : favoritesCount + 1;
		const newArticle = {
			...article,
			favorited: !favorited,
			favoritesCount: favCount,
		};

		saveArticle(newArticle);

		articlesService
			.favoriteArticle(
				articleSlug,
				localStorage.getItem('token'),
				bool ? 'DELETE' : 'POST'
			)
			.catch(() => {
				message.error('Error');
				saveArticle(oldArticles);
			});
	};

	const confirmDeleteArticle = () => {
		articlesService
			.deleteArticle(localStorage.getItem('token'), slug)
			.then(() => {
				history.push('/articles');
				message.success('The article was successfully deleted');
			});
	};

	const cancelDeleteArticle = () => {
		message.error('Article not deleted');
	};

	const editArticle = () => {
		history.push(`/articles/${slug}/edit`);
	};

	const renderComponent = article ? (
		<ArticlePage
			slug={slug}
			likeArticle={likeArticle}
			article={article}
			username={username}
			confirmDeleteArticle={confirmDeleteArticle}
			cancelDeleteArticle={cancelDeleteArticle}
			editArticle={editArticle}
		/>
	) : (
		<Spinner />
	);

	return renderComponent;
};

const mapStateToProps = (state) => ({
	article: state.articlesReducer.article,
	username: state.userReducer.username,
});

const mapDispatchToProps = {
	saveArticle: addArticle,
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(ArticlePageContainer);
