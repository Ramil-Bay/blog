import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import ArticleForm from '../ArticleForm';
import * as actions from '../../actions/addTag';
import ApiService from '../../API/ApiService';

import classes from './CreateArticle.module.scss';

const CreateArticle = ({articlesInfo, deleteAllTag, addNewTag, deleteTag}) => {

	const apiService = new ApiService();

	useEffect(() => {
		return (() => deleteAllTag());
	}, [ ])

	console.log(articlesInfo);

	const { newArticle, newArticle__heading, newArticle__form, newArticle__fieldName, newArticle__field, 
		newArticle__textField, newArticle__submit, newArticle__addTag, newArticle__tag, newArticle__tagBlock,
		newArticle__deleteTag, errorMessage } = classes;

	const textFieldClass = newArticle__field + ' ' + newArticle__textField;

	const { register, handleSubmit, watch, errors, setError, clearErrors } = useForm();

	const { addTagData, tagCounter } = articlesInfo;

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

		apiService.createArticle(newObj, localStorage.getItem('token')).
		then((res) => console.log(res));
	}

	const addTagFunc = () => {
		addNewTag();
	}

	const deleteTagFunc = (id) => {
		deleteTag(id);
	}


	const tag = articlesInfo.addTagData.map(elem => {
		return (
			<div key={ elem } className={newArticle__tagBlock}>
				<input type="text"  ref={register()} name={elem} className={ newArticle__tag } placeholder="Tag"/>
				<button onClick={() => { deleteTag(elem) }} className={ newArticle__deleteTag } >Delete</button>
			</div>
		)
	})

	return (
		<ArticleForm onSubmit={onSubmit} addTagFunc={() => addTagFunc()} tagList={articlesInfo.tags}
		deleteTagFunc={deleteTagFunc} />
	)
}

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default connect(mapStateToProps, actions)(CreateArticle);