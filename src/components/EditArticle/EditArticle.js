import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import Spinner from '../Spinner';

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
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
	slug,
	addDefaultValue,
}) => {
	const apiService = new ApiService();

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
			.updateArticle(
				newObj,
				localStorage.getItem('token'),
				defaultValue.slug
			)
			.then(() => history.push(`/articles/${defaultValue.slug}`));
	};

	const deleteTagFunc = (id) => {
		deleteTag(id);
	};

	useEffect(() => {
		apiService
			.getArticle(slug, localStorage.getItem('token'))
			.then((res) => {
				const {
					title,
					description,
					body,
					tagList,
					author,
				} = res.article;
				
				if (author.username !== localStorage.getItem('username')) history.push('/articles');

				addDefaultValue({
					title,
					description,
					body,
					tagList,
					author,
					slug,
				});

				addArticlesTag(tagList);
			})
			.catch(() => {
				history.push('/articles');
				message.error('This article was deleted');
			});

		return () => {
			addDefaultValue({
				title: null,
				description: null,
				body: null,
				tagList: null,
				author: null,
				slug: null,
			});
			deleteAllTag();
		};
	}, []);

	const renderSpinnerOrComponent = defaultValue.title ? (
		<ArticleForm
			onSubmit={onSubmit}
			addTagFunc={() => addTagFunc()}
			title={defaultValue.title}
			description={defaultValue.description}
			body={defaultValue.body}
			tagList={tagsInfo.tags}
			tagValue={tagsInfo.tagValue}
			deleteTagFunc={deleteTagFunc}
			changeTagValue={changeTagValue}
			changeFocus={changeFocus}
		/>
	) : (
		<Spinner />
	);

	return renderSpinnerOrComponent;
};

export default withRouter(EditArticle);
