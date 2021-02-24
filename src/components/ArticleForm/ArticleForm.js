import React from 'react';
import { useForm } from 'react-hook-form';

import ErrorMessages from '../../errorMessages/errorMessages';

import classes from './ArticleForm.module.scss';

const ArticleForm = ({
	onSubmit,
	addTagFunc,
	title = null,
	description = null,
	body = null,
	tagList = null,
	deleteTagFunc,
	edit = false,
	tagValue,
	changeTagValue,
	changeFocus,
}) => {
	const {
		newArticle,
		newArticle__heading,
		newArticle__form,
		newArticle__fieldName,
		newArticle__field,
		newArticle__textField,
		newArticle__submit,
		newArticle__addTag,
		tagsContainer,
		newArticle__tag,
	} = classes;

	const errorMessages = new ErrorMessages();

	const { register, handleSubmit, errors } = useForm();

	const repeatTagClass = `${classes.tags__oneTag} ${classes.tags__oneTagRepeat}`;

	const tagArray =
		tagList &&
		tagList.map((elem) => (
			<button
				className={elem.repeat ? repeatTagClass : classes.tags__oneTag}
				type="button"
				aria-label="Tag"
				key={elem.id}
				onClick={() => deleteTagFunc(elem.id)}
			>
				{elem.value}
			</button>
		));

	const textFieldClass = `${newArticle__field} ${newArticle__textField}`;

	return (
		<div className={newArticle}>
			<h1 className={newArticle__heading}>
				{edit ? 'Edit article' : 'Create new article'}
			</h1>
			<form
				className={newArticle__form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<span className={newArticle__fieldName}>Title</span>
				<input
					type="text"
					name="title"
					className={newArticle__field}
					ref={register({ required: true })}
					defaultValue={title}
					placeholder="Title"
				/>
				{errorMessages.articleFormError(errors.title?.type)}

				<span className={newArticle__fieldName}>Short description</span>
				<input
					type="text"
					name="description"
					className={newArticle__field}
					ref={register({ required: true })}
					defaultValue={description}
					placeholder="Description"
				/>
				{errorMessages.articleFormError(errors.description?.type)}

				<span className={newArticle__fieldName}>Text</span>
				<textarea
					type="text"
					name="body"
					className={textFieldClass}
					ref={register({ required: true })}
					defaultValue={body}
					placeholder="Text"
				/>
				{errorMessages.articleFormError(errors.body?.type)}

				<span className={newArticle__fieldName}>Tags</span>
				<div className={tagsContainer}>{tagArray}</div>

				<input
					name="tag"
					type="text"
					className={newArticle__tag}
					placeholder="Tag"
					value={tagValue}
					ref={register}
					onChange={(value) => changeTagValue(value.target.value)}
					onFocus={() => changeFocus(true)}
					onBlur={() => changeFocus(false)}
				/>

				<span
					className={newArticle__addTag}
					onClick={() => addTagFunc()}
				>
					Add tag
				</span>

				<input
					type="submit"
					value="save"
					className={newArticle__submit}
				/>
			</form>
		</div>
	);
};

export default ArticleForm;
