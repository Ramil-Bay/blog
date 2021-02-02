import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {  Popconfirm, message  } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


import ApiService from '../../API/ApiService';
import * as actions from '../../actions/articlesActions';

import classes from './Article.module.scss';

const Article = ({ slug, articlesInfo, getArticle, getArticles, getArticlesCount, history}) => {
	const apiService = new ApiService();

	const { articles__elem, articles__header, articles_paragraph, articles__heading, articles__user, articles__like,
		articles__userName, articles__date, articles__userPhoto, articles__container, articles__tag, 
		articles__pagination, articles__block, article__body, article__container, article__delete, 
		article__edit } = classes;

	const { title, description, body, author, tagList, createdAt, favorited, 
		favoritesCount } = articlesInfo.article.article

	let tags;

	if (tagList !== []) tags = tagList.map((elem, i) => (<button className={articles__tag} key={i}>{ elem }</button>))

	const confirm = (deleteData) => {
		apiService.deleteArticle(localStorage.getItem('token'), slug)
		.then(() => {
			history.push('/articles');
			message.success('The article was successfully deleted');
		});
	}

	const cancel = (deleteData) => {
		message.error('Article not deleted');
	}

	const editArticle = () => {
		history.push(`/articles/${slug}/edit`)
	}

	return (
		<div className={articles__elem}>
			<div className={articles__container}>
				<div className={articles__header}>
					<h2 className={articles__heading}>{ title }</h2>
					<button className={articles__like}>
					<img src={favorited ? "../../img/LikeRed.svg" : "../../img/Like.svg"}
					alt="Like" /></button><span>{ favoritesCount }</span>
				</div>
				{ tags }
			</div>
			<div className={articles__user}>
				<div className={articles__block}>
					<span className={articles__userName}>{ author.username }</span><br />
					<span className={articles__date}>{format(new Date(createdAt), 'MMMM d, y')}</span>
				</div>
				<img className={articles__userPhoto} src={author.image ? author.image : "../../img/UserPhoto.png" } 
				alt="User photo" />
			</div>
			<div className={article__container}>
				<p className={articles_paragraph}>{ description }</p>
				<Popconfirm title="Are you sure to delete this article?" onConfirm={confirm} onCancel={cancel} 
				okText="Yes" cancelText="No"><button className={article__delete}>Delete</button></Popconfirm>
				<button className={article__edit} onClick={ editArticle }>Edit</button>
			</div>
			<ReactMarkdown plugins={[gfm]} children={ body } className={article__body} />
		</div>
	)
}

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default compose(connect(mapStateToProps, actions), withRouter)(Article);