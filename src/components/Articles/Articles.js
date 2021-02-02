import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../actions/articlesActions';
import ApiService from '../../API/ApiService';

import classes from './Articles.module.scss';
import 'antd/dist/antd.css';

const Articles = ({ userInfo, articlesInfo, getArticles, getArticlesCount, history }) => {
	const {articles, articles__elem, articles__header, articles_paragraph, articles__heading, articles__user, articles__like,
		articles__userName, articles__date, articles__userPhoto, articles__container, articles__tag, 
		articles__pagination, articles__block } = classes;

	const apiService = new ApiService();

	const { articlesCount } = articlesInfo;

	useEffect(() => {
		if (userInfo.username) {
			apiService.getArticles(localStorage.getItem('token'), userInfo.username)
			.then(res => {
				console.log(res)
				getArticles(res.articles);
				getArticlesCount(res.articlesCount);
			});
		}
	}, [userInfo.username])

	const newPage = (value) => {
		apiService.getArticles(localStorage.getItem('token'), userInfo.username, (value - 1) * 10)
		.then(res => {
			getArticles(res.articles);
		})
	}

	const likeArticle = (bool, slug) => {
		if (bool) {
			apiService.favoriteArticle(slug, localStorage.getItem('token'), 'DELETE')
			.then(res =>{
				const newArr = articlesInfo.articles.map(elem => {
					if (elem.slug === res.article.slug) return res.article;
					return elem;
				})

				getArticles(newArr);
			});

		} else {
			apiService.favoriteArticle(slug, localStorage.getItem('token'), 'POST')
			.then(res => {
				const newArr = articlesInfo.articles.map(elem => {
					if (elem.slug === res.article.slug) return res.article;
					return elem;
				})

				getArticles(newArr);
			});
		}	
	}

	let articlesArray;

	console.log(articlesInfo);

	if (articlesInfo.articles) {
		articlesArray = articlesInfo.articles.map(elem => {
			let tagList;
			if (elem.tagList !== []) {
				tagList = elem.tagList.map((elem, i) => (<button className={articles__tag} key={i}>{ elem }</button>))
			}
			return(
				<li className={articles__elem} key={ elem.slug }>
					<div className={articles__container}>
						<div className={articles__header}>
							<h2 className={articles__heading} onClick={() => history.push(`/articles/${elem.slug}`)}>
							{elem.title}</h2>
							<button className={articles__like} onClick={() => likeArticle(elem.favorited, elem.slug)}>
							<img src={ elem.favorited ? "./img/LikeRed.svg" : "./img/Like.svg"} alt="Like" />
							</button><span>{ elem.favoritesCount }</span>
						</div>
					{ tagList }
					</div>
					<div className={articles__user}>
						<div className={articles__block}>
							<span className={articles__userName}>{ elem.author.username }</span><br />
							<span className={articles__date}>{format(new Date(elem.createdAt), 'MMMM d, y')}</span>
						</div>
						<img className={articles__userPhoto} src={ elem.author.image ? elem.author.image : "../../img/UserPhoto.png"} 
						alt="User photo" />
					</div>
					<p className={articles_paragraph}> {elem.description }</p>
				</li>
			)
		})
	}

	return (
		<div>
		<ul className={articles}>
			{ articlesArray }
		</ul>
		<Pagination defaultCurrent={1} showSizeChanger={false} total={articlesCount ? articlesCount : 0}
		className={articles__pagination} onChange={(value) => {newPage(value)}}/>
		</div>
	)
}

const mapStateToProps = (state) => ({
	userInfo: state.userReducer,
	articlesInfo: state.articlesReducer,
});

export default connect(mapStateToProps, actions)(Articles);