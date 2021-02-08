import React, { useEffect } from 'react';
import { Pagination } from 'antd';

import ApiService from '../../API/ApiService';
import Spinner from '../Spinner';
import OneArticle from '../OneArticle';

import classes from './Articles.module.scss';
import 'antd/dist/antd.css';

const Articles = ({
	userInfo,
	articlesInfo,
	getArticles,
	getArticlesCount,
}) => {
	const {
		articles,
		articles__elem,
		articles__pagination,
		articlesAndPaginations,
		articles__paginationNone,
	} = classes;

	const apiService = new ApiService();

	const { articlesCount } = articlesInfo;

	useEffect(() => {
		apiService.getArticles(localStorage.getItem('token')).then((res) => {
			getArticles(res.articles);
			getArticlesCount(res.articlesCount);
		});

		return () => {
			getArticles(null);
			getArticlesCount(null);
		};
	}, [userInfo.username]);

	const newPage = (value) => {
		getArticles(null);
		apiService
			.getArticles(localStorage.getItem('token'), (value - 1) * 10)
			.then((res) => {
				getArticles(res.articles);
			});
	};

	const spinner = !articlesInfo.articles ? <Spinner /> : null;

	let articlesArray;

	if (articlesInfo.articles) {
		articlesArray = articlesInfo.articles.map((elem) => (
			<li className={articles__elem} key={elem.slug}>
				<OneArticle {...elem} />
			</li>
		));
	}

	return (
		<div className={articlesAndPaginations}>
			<ul className={articles}>{articlesArray}</ul>
			{spinner}
			<Pagination
				defaultCurrent={1}
				showSizeChanger={false}
				total={articlesCount || 0}
				className={
					articlesInfo.articles
						? articles__pagination
						: articles__paginationNone
				}
				onChange={(value) => {
					newPage(value);
				}}
				style={{ marginTop: 'auto' }}
			/>
		</div>
	);
};

export default Articles;
