import React from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { message } from 'antd';

import ApiService from '../../API/ApiService';
import * as actions from '../../actions/articlesActions';

import classes from '../Articles/Articles.module.scss';

const OneArticle = ({
	title,
	favorited,
	favoritesCount,
	author,
	createdAt,
	description,
	tagList,
	articlesInfo,
	slug,
	getArticles,
	history,
}) => {
	const apiService = new ApiService();

	let tags;
	if (tagList !== []) {
		tags = tagList.map((element, i) => (
			<button className={classes.articles__tag} key={i} type="button">
				{element}
			</button>
		));
	}

	const likeArticle = (bool, articleSlug) => {
		const oldArticles = articlesInfo.articles;
		const newArticles = oldArticles.map((elem) => {
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

		getArticles(newArticles);

		apiService
			.favoriteArticle(
				articleSlug,
				localStorage.getItem('token'),
				bool ? 'DELETE' : 'POST'
			)
			.catch(() => {
				message.error('Error');
				getArticles(oldArticles);
			});
	};

	return (
		<>
			<div className={classes.articles__container}>
				<div className={classes.articles__header}>
					<h2
						className={classes.articles__heading}
						onClick={() => history.push(`/articles/${slug}`)}
					>
						{title}
					</h2>
					<button
						className={
							favorited
								? classes.articles__like
								: classes.articles__unlike
						}
						onClick={() => likeArticle(favorited, slug)}
						type="button"
						aria-label="Like"
					/>
					<span>{favoritesCount}</span>
				</div>
				{tags}
			</div>
			<div className={classes.articles__user}>
				<div className={classes.articles__block}>
					<span className={classes.articles__userName}>
						{author.username}
					</span>
					<br />
					<span className={classes.articles__date}>
						{format(new Date(createdAt), 'MMMM d, y')}
					</span>
				</div>
				<img
					className={classes.articles__userPhoto}
					src={
						author.image ? author.image : '../../img/UserPhoto.png'
					}
					alt="User photo"
				/>
			</div>
			<p className={classes.articles_paragraph}>{description}</p>
		</>
	);
};

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default compose(
	connect(mapStateToProps, actions),
	withRouter
)(OneArticle);
