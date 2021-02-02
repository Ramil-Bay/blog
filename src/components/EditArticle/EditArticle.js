import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import ArticleForm from '../ArticleForm';
import * as actions from '../../actions/addTag';
import ApiService from '../../API/ApiService';

const EditArticle = ({ articlesInfo, match, history, addArticlesTag, addNewTag, deleteTag, deleteAllTag }) => {

	const apiService = new ApiService();

	const articleArray = articlesInfo.articles.filter(elem => elem.slug === match.params.slug);

	const article = articleArray[0];

	const onSubmit = data => {
		const tagArray = [];

		for (let key in data) {
			if (key.slice(0, 3) === 'tag' && data[key].trim()) tagArray.push(data[key]);
		}

		const newObj = {
			body: data.body,
			title: data.title, 
			description: data.description,
			tagList: tagArray,
		}

		apiService.updateArticle(newObj, localStorage.getItem('token'), article.slug)
		.then((res) => history.push(`/articles/${article.slug}`));
	}

	const addTagFunc = () => {
		addNewTag();
	}

	const deleteTagFunc = (id) => {
		deleteTag(id);
	}
	
	useEffect(() => {
		addArticlesTag(article.tagList);

		return (() => deleteAllTag());
	}, [ ])



	return (
		<ArticleForm onSubmit={onSubmit} addTagFunc={() => addTagFunc()} title={article.title}
		description={article.description} body={article.body} tagList={articlesInfo.tags} deleteTagFunc={deleteTagFunc}
		edit={true} />
	)
}

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default compose(connect(mapStateToProps, actions), withRouter)(EditArticle);