import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ArticleForm from '../../components/ArticleForm';
import ArticlesService from '../../api/ArticlesService';
import {
	addNewTag,
	deleteTag,
	deleteAllTag,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
} from '../../actions/tagActions';

const CreateArticle = ({
	tags,
	tagValue,
	tagFieldFocus,
	removeAllTag,
	addTag,
	removeTag,
	history,
	changeTagField,
	changeTagFieldFocus,
	tagRepeated,
	tagNotRepeated,
}) => {
	const articlesService = new ArticlesService();

	useEffect(() => () => removeAllTag(), []);

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
			.createArticle(newObj, localStorage.getItem('token'))
			.then(() => history.push(`/articles`));
	};

	const deleteTagFunc = (id) => {
		removeTag(id);
	};

	return (
		<ArticleForm
			onSubmit={onSubmit}
			addTagFunc={() => addTagFunc()}
			tagList={tags}
			deleteTagFunc={deleteTagFunc}
			tagValue={tagValue}
			changeTagValue={changeTagField}
			changeFocus={changeTagFieldFocus}
		/>
	);
};

const mapStateToProps = (state) => ({
	tags: state.tagsReducer.tags,
	tagValue: state.tagsReducer.tagValue,
	tagFieldFocus: state.tagsReducer.focus,
	defaultValue: state.defaultValueReducer,
});

const mapDispatchToProps = {
	addTag: addNewTag,
	removeTag: deleteTag,
	removeAllTag: deleteAllTag,
	changeTagField: changeTagValue,
	changeTagFieldFocus: changeFocus,
	tagRepeated: repeatTag,
	tagNotRepeated: notRepeatTag,
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(CreateArticle);
