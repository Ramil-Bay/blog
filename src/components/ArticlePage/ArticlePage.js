import React from 'react';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';

import ApiService from '../../API/ApiService';

import classes from './ArticlePage.module.scss';

const ArticlePage = ({
	slug,
	articlesInfo,
	history,
	addDefaultValue,
	userInfo,
	likeArticle,
}) => {
	const apiService = new ApiService();

	const {
		title,
		description,
		body,
		author,
		tagList,
		createdAt,
		favorited,
		favoritesCount,
	} = articlesInfo.article.article;

	let tags;

	if (tagList !== []) {
		tags = tagList.map((elem, i) => (
			<button className={classes.articles__tag} key={i} type="button">
				{elem}
			</button>
		));
	}

	const confirm = () => {
		apiService
			.deleteArticle(localStorage.getItem('token'), slug)
			.then(() => {
				history.push('/articles');
				message.success('The article was successfully deleted');
			});
	};

	const cancel = () => {
		message.error('Article not deleted');
	};

	const editArticle = () => {
		addDefaultValue({ title, description, body, tagList, slug });
		history.push(`/articles/${slug}/edit`);
	};

	const deleteEditButton =
		userInfo.username === author.username ? (
			<>
				<Popconfirm
					title="Are you sure to delete this article?"
					onConfirm={confirm}
					onCancel={cancel}
					okText="Yes"
					cancelText="No"
				>
					<button className={classes.article__delete} type="button">
						Delete
					</button>
				</Popconfirm>
				<button
					className={classes.article__edit}
					onClick={editArticle}
					type="button"
				>
					Edit
				</button>
			</>
		) : null;

	return (
		<div className={classes.articles__elem}>
			<div className={classes.articles__container}>
				<div className={classes.articles__header}>
					<h2 className={classes.articles__heading}>{title}</h2>
					<button
						className={
							favorited
								? classes.articles__like
								: classes.articles__unlike
						}
						type="button"
						onClick={() => likeArticle(favorited, slug)}
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
			<div className={classes.article__container}>
				<p className={classes.articles_paragraph}>{description}</p>
				{deleteEditButton}
			</div>
			<ReactMarkdown
				plugins={[gfm]}
				children={body}
				className={classes.article__body}
			/>
		</div>
	);
};

export default withRouter(ArticlePage);
