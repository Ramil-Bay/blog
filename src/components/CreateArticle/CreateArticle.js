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
}) => {
	const apiService = new ApiService();

	useEffect(() => () => deleteAllTag(), []);

	const onSubmit = (data) => {
		const tagArray = [];

		for (const key in data) {
			if (key.slice(0, 3) === 'tag' && data[key].trim()) {
				tagArray.push(data[key]);
			}
		}

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

	const addTagFunc = () => {
		addNewTag();
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
		/>
	);
};

export default withRouter(CreateArticle);
