import React from 'react';
import format from 'date-fns/format';
import { withRouter } from 'react-router-dom';

import classes from './Article.module.scss';

const OneArticle = ({
	title,
	favorited,
	favoritesCount,
	author,
	createdAt,
	description,
	tagList,
	slug,
	likeArticle,
	history,
}) => {
	const tags =
		tagList !== [] &&
		tagList.map((element, i) => (
			<button className={classes.articles__tag} key={i} type="button">
				{element}
			</button>
		));

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
					className={classes['articles__user-photo']}
					src={author.image ? author.image : '../img/UserPhoto.png'}
					alt="User photo"
				/>
			</div>
			<p className={classes.articles_paragraph}>{description}</p>
		</>
	);
};

export default withRouter(OneArticle);
