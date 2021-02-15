import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import ArticleForm from '../ArticleForm';
import ApiService from '../../API/ApiService';

const CreateArticle = ({
	tagsInfo,
	deleteAllTag,
	addNewTag,
	deleteTag,
	history,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
}) => {
	const apiService = new ApiService();

	useEffect(() => () => deleteAllTag(), []);

	const addTagFunc = () => {
		const { tagValue, tags } = tagsInfo;
		if (tagValue.trim()) {
			if (!tags.length) {
				addNewTag(tagValue);
				changeTagValue('');
			} else if (tags.filter((elem) => elem.value === tagValue).length) {
				repeatTag(tagValue);
				setTimeout(notRepeatTag, 300);
			} else {
				addNewTag(tagValue);
				changeTagValue('');
			}
		}
	};

	const onSubmit = (data) => {
		const { focus, tags } = tagsInfo;

		if (focus) {
			return addTagFunc();
		}

		const tagArray = tags.map((elem) => elem.value);

		const newObj = {
			body: data.body,
			title: data.title,
			description: data.description,
			tagList: tagArray,
		};

		apiService
			.createArticle(newObj, localStorage.getItem('token'))
			.then(() => history.push(`/articles`));
	};

	const deleteTagFunc = (id) => {
		deleteTag(id);
	};

	return (
		<ArticleForm
			onSubmit={onSubmit}
			addTagFunc={() => addTagFunc()}
			tagList={tagsInfo.tags}
			deleteTagFunc={deleteTagFunc}
			tagValue={tagsInfo.tagValue}
			changeTagValue={changeTagValue}
			changeFocus={changeFocus}
		/>
	);
};

export default withRouter(CreateArticle);
