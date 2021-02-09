import React, { useEffect } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';

import ArticlePage from '../ArticlePage';
import ApiService from '../../API/ApiService';
import Spinner from '../Spinner';

const ArticleRender = ({
	slug,
	articlesInfo,
	getArticle,
	history,
	addDefaultValue,
	userInfo,
}) => {
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
		<ArticlePage
			slug={slug}
			likeArticle={likeArticle}
			articlesInfo={articlesInfo}
			addDefaultValue={addDefaultValue}
			userInfo={userInfo}
		/>
	) : (
		<Spinner />
	);

	return renderComponent;
};

export default withRouter(ArticleRender);
