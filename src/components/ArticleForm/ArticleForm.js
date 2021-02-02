import React from 'react';
import { useForm } from 'react-hook-form';

import classes from '../CreateArticle/CreateArticle.module.scss';

const ArticleForm = ({ onSubmit, addTagFunc, title = null, description = null, body = null, tagList = null, 
	deleteTagFunc, edit = false }) => {

	const { newArticle, newArticle__heading, newArticle__form, newArticle__fieldName, newArticle__field, 
		newArticle__textField, newArticle__submit, newArticle__addTag, newArticle__tag, newArticle__tagBlock,
		newArticle__deleteTag, errorMessage } = classes;

	const { register, handleSubmit, watch, errors, setError, clearErrors } = useForm();	

	let tagArray;

	if (tagList) {
		tagArray = tagList.map(elem => {
			return (
				<div className={newArticle__tagBlock} key={ elem.id }>
					<input type="text"  ref={register()} defaultValue={elem.value} className={ newArticle__tag }
					placeholder="Tag" name={ elem.name } />
					<span className={ newArticle__deleteTag } onClick={() => deleteTagFunc(elem.id)}>Delete</span>
				</div>
			)
		})
	}

	const textFieldClass = newArticle__field + ' ' + newArticle__textField;

	return (
		<div className={ newArticle }>
			<h1 className={ newArticle__heading }>{edit ? 'Edit article' : 'Create new article'}</h1>
			<form className={ newArticle__form } onSubmit={handleSubmit(onSubmit)}>
				<span className={ newArticle__fieldName } >Title</span>
				<input type="text" name="title" className={ newArticle__field } ref={register({required: true})} 
				defaultValue={title} />

				{errors.title?.type === "required" && (<p className={ errorMessage }>
				Required field.</p>)}

				<span className={ newArticle__fieldName } >Short description</span>
				<input type="text" name="description" className={ newArticle__field } ref={register({required: true})} 
				defaultValue={description} />

				{errors.title?.type === "required" && (<p className={ errorMessage }>
				Required field.</p>)}

				<span className={ newArticle__fieldName } >Text</span>
				<textarea type="text" name="body" className={ textFieldClass } ref={register({required: true})} 
				defaultValue={body} />

				{errors.title?.type === "required" && (<p className={ errorMessage }>
				Required field.</p>)}

				<span className={ newArticle__fieldName } >Tags</span>

				{ tagArray }

				<span className={ newArticle__addTag } onClick={() => addTagFunc()}>Add tag</span>

				<input type="submit" value="save" className={ newArticle__submit } />
			</form>
		</div>
	)
}

export default ArticleForm;