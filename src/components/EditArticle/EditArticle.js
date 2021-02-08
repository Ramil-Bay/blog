import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import ArticleForm from '../ArticleForm';
import ApiService from '../../API/ApiService';

const EditArticle = ({
	tagsInfo,
	history,
	addArticlesTag,
	addNewTag,
	deleteTag,
	deleteAllTag,
	defaultValue,
}) => {
	const apiService = new ApiService();

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
			.updateArticle(
				newObj,
				localStorage.getItem('token'),
				defaultValue.slug
			)
			.then(() => history.push(`/articles/${defaultValue.slug}`));
	};

	const addTagFunc = () => {
		addNewTag();
	};

	const deleteTagFunc = (id) => {
		deleteTag(id);
	};

	useEffect(() => {
		addArticlesTag(defaultValue.tagList);

		return () => deleteAllTag();
	}, []);

	return (
		<ArticleForm
			onSubmit={onSubmit}
			addTagFunc={() => addTagFunc()}
			title={defaultValue.title}
			description={defaultValue.description}
			body={defaultValue.body}
			tagList={tagsInfo.tags}
			deleteTagFunc={deleteTagFunc}
			edit
		/>
	);
};

export default withRouter(EditArticle);
