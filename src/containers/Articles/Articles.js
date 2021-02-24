import React, { useEffect } from 'react';
import { Pagination, message } from 'antd';
import { connect } from 'react-redux';

import ArticlesService from '../../api/ArticlesService';
import Spinner from '../../components/Spinner';
import Article from '../../components/Article';
import {
	addArticles,
	addArticlesCount,
	changeArticlesPage,
} from '../../actions/articlesActions';

import classes from './Articles.module.scss';

const Articles = ({
	addArticlesList,
	addNumberOfArticles,
	changeArticlesPages,
	getMyArticles,
	articlesCount,
	articlesList,
	articlesPages,
}) => {
	const {
		articles,
		articles__elem,
		articles__pagination,
		articles__list,
		articles__paginationNone,
	} = classes;

	const articlesService = new ArticlesService();

	useEffect(() => {
		if (getMyArticles) {
			changeArticlesPages(1);
			articlesService
				.getMyArticles(
					localStorage.getItem('token'),
					localStorage.getItem('username')
				)
				.then((res) => {
					addArticlesList(res.articles);
					addNumberOfArticles(res.articlesCount);
				});
		} else {
			changeArticlesPages(1);
			if (localStorage.getItem('token')) {
				articlesService
					.getArticlesWithToken(localStorage.getItem('token'))
					.then((res) => {
						addArticlesList(res.articles);
						addNumberOfArticles(res.articlesCount);
					});
			} else {
				articlesService.getArticles().then((res) => {
					addArticlesList(res.articles);
					addNumberOfArticles(res.articlesCount);
				});
			}
		}
		return () => {
			addArticlesList(null);
			addNumberOfArticles(null);
		};
	}, [getMyArticles]);

	const newPage = (value) => {
		changeArticlesPages(value);
		addArticlesList(null);
		if (getMyArticles) {
			articlesService
				.getMyArticles(
					localStorage.getItem('token'),
					localStorage.getItem('username'),
					(value - 1) * 10
				)
				.then((res) => {
					addArticlesList(res.articles);
				});
		} else if (localStorage.getItem('token')) {
			articlesService
				.getArticlesWithToken(
					localStorage.getItem('token'),
					(value - 1) * 10
				)
				.then((res) => {
					addArticlesList(res.articles);
				});
		} else {
			articlesService.getArticles((value - 1) * 10).then((res) => {
				addArticlesList(res.articles);
			});
		}
	};

	const likeArticle = (bool, articleSlug) => {
		const newArticles = articlesList.map((elem) => {
			if (elem.slug === articleSlug) {
				const favCount = bool
					? elem.favoritesCount - 1
					: elem.favoritesCount + 1;
				return {
					...elem,
					favorited: !elem.favorited,
					favoritesCount: favCount,
				};
			}
			return elem;
		});
		addArticlesList(newArticles);
		articlesService
			.favoriteArticle(
				articleSlug,
				localStorage.getItem('token'),
				bool ? 'DELETE' : 'POST'
			)
			.catch(() => {
				message.error('Error');
				addArticlesList(articlesList);
			});
	};

	const spinner = !articlesList && <Spinner />;

	const articlesArray =
		articlesList &&
		articlesList.map((elem) => (
			<li className={articles__elem} key={elem.slug}>
				<Article
					{...elem}
					articlesList={articlesList}
					likeArticle={likeArticle}
				/>
			</li>
		));

	return (
		<div className={articles}>
			<ul className={articles__list}>{articlesArray}</ul>
			{spinner}
			<Pagination
				showSizeChanger={false}
				total={articlesCount || 0}
				className={
					articlesList
						? articles__pagination
						: articles__paginationNone
				}
				current={articlesPages}
				onChange={(value) => {
					newPage(value);
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	getMyArticles: state.articlesReducer.getMyArticles,
	articlesCount: state.articlesReducer.articlesCount,
	articlesList: state.articlesReducer.articles,
	articlesPages: state.articlesReducer.articlePages,
});

const mapDispatchToProps = {
	changeArticlesPages: changeArticlesPage,
	addArticlesList: addArticles,
	addNumberOfArticles: addArticlesCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
