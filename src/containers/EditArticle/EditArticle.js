import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Spinner from '../../components/Spinner';
import ArticleForm from '../../components/ArticleForm';
import ArticlesService from '../../api/ArticlesService';
import {
	addArticleTags,
	addNewTag,
	deleteTag,
	deleteAllTag,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
} from '../../actions/tagActions';
import { addDefaultValue } from '../../actions/defaultValueActions';

const EditArticle = ({
	tags,
	tagValue,
	tagFieldFocus,
	history,
	saveArticleTags,
	addTag,
	removeTag,
	removeAllTag,
	defaultValue,
	changeTagField,
	changeTagFieldFocus,
	tagRepeated,
	tagNotRepeated,
	addArticleDefaultValue,
	match,
}) => {
	const articlesService = new ArticlesService();

	const { slug } = match.params;

	const addTagFunc = () => {
		if (tagValue.trim()) {
			if (!tags.length) {
				addTag(tagValue);
				changeTagField('');
			} else if (tags.filter((elem) => elem.value === tagValue).length) {
				tagRepeated(tagValue);
				setTimeout(tagNotRepeated, 300);
			} else {
				addTag(tagValue);
				changeTagField('');
			}
		}
	};

	const onSubmit = (data) => {
		if (tagFieldFocus) {
			return addTagFunc();
		}

		const tagArray = tags.map((elem) => elem.value);

		const newObj = {
			body: data.body,
			title: data.title,
			description: data.description,
			tagList: tagArray,
		};

		articlesService
			.updateArticle(
				newObj,
				localStorage.getItem('token'),
				defaultValue.slug
			)
			.then(() => history.push(`/articles/${defaultValue.slug}`));
	};

	const deleteTagFunc = (id) => {
		removeTag(id);
	};

	useEffect(() => {
		articlesService
			.getArticleWithToken(slug, localStorage.getItem('token'))
			.then((res) => {
				const {
					title,
					description,
					body,
					tagList,
					author,
				} = res.article;

				if (author.username !== localStorage.getItem('username')) {
					history.push('/articles');
				}

				addArticleDefaultValue({
					title,
					description,
					body,
					tagList,
					author,
					slug,
				});

				saveArticleTags(tagList);
			})
			.catch(() => {
				history.push('/articles');
				message.error('This article was deleted');
			});

		return () => {
			addArticleDefaultValue({
				title: null,
				description: null,
				body: null,
				tagList: null,
				author: null,
				slug: null,
			});
			removeAllTag();
		};
	}, []);

	const renderSpinnerOrComponent = defaultValue.title ? (
		<ArticleForm
			onSubmit={onSubmit}
			addTagFunc={() => addTagFunc()}
			title={defaultValue.title}
			description={defaultValue.description}
			body={defaultValue.body}
			tagList={tags}
			tagValue={tagValue}
			deleteTagFunc={deleteTagFunc}
			changeTagValue={changeTagField}
			changeFocus={changeTagFieldFocus}
		/>
	) : (
		<Spinner />
	);

	return renderSpinnerOrComponent;
};

const mapStateToProps = (state) => ({
	tags: state.tagsReducer.tags,
	tagValue: state.tagsReducer.tagValue,
	tagFieldFocus: state.tagsReducer.focus,
	defaultValue: state.defaultValueReducer,
});

const mapDispatchToProps = {
	saveArticleTags: addArticleTags,
	addTag: addNewTag,
	removeTag: deleteTag,
	removeAllTag: deleteAllTag,
	changeTagField: changeTagValue,
	changeTagFieldFocus: changeFocus,
	tagRepeated: repeatTag,
	tagNotRepeated: notRepeatTag,
	addArticleDefaultValue: addDefaultValue,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(EditArticle);
