import React from 'react';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import ApiService from '../../API/ApiService';

import classes from './EditProfile.module.scss';

const EditProfile = ({ addUserInfo }) => {
	const apiService = new ApiService();

	const {
		sign,
		sign__form,
		sign__header,
		sign__input,
		sign__fieldName,
		sign__submit,
		errorMessage,
	} = classes;

	const { register, handleSubmit, errors, setError } = useForm();

	const success = () => {
		message.success('Your profile has been successfully updated', 3);
	};

	const onSubmit = (data) => {
		apiService
			.updateUser(data, localStorage.getItem('token'))
			.then((res) => {
				if (res.errors) {
					if (res.errors.email !== undefined) {
						setError('email', {
							type: 'taken',
							message: 'has already been taken',
						});
					}
					if (res.errors.username !== undefined) {
						setError('username', {
							type: 'taken',
							message: 'has already been taken',
						});
					}
				} else {
					const { token, bio, image, email, username } = res.user;
					localStorage.setItem('token', token);
					addUserInfo({ token, bio, image, email, username });
					success();
				}
			});
	};

	return (
		<div className={sign}>
			<h1 className={sign__header}>Edit Profile</h1>
			<form className={sign__form} onSubmit={handleSubmit(onSubmit)}>
				<span className={sign__fieldName}>New username</span>
				<input
					type="text"
					name="username"
					className={sign__input}
					placeholder="New username"
					ref={register({
						required: true,
						minLength: 3,
						maxLength: 20,
					})}
				/>
				{errors.username?.type === 'required' && (
					<p className={errorMessage}>Required field.</p>
				)}

				{errors.username?.type === 'minLength' && (
					<p className={errorMessage}>
						Your username needs to be at least 3 characters.
					</p>
				)}

				{errors.username?.type === 'maxLength' && (
					<p className={errorMessage}>
						Your username must not exceed 20 characters.
					</p>
				)}

				{errors.username?.type === 'taken' && (
					<p className={errorMessage}>{errors.username.message}</p>
				)}

				<span className={sign__fieldName}>New Email address</span>
				<input
					className={sign__input}
					type="email"
					name="email"
					placeholder="Email address"
					ref={register({ required: true })}
				/>
				{errors.username?.type === 'required' && (
					<p className={errorMessage}>Required field.</p>
				)}

				{errors.email?.type === 'taken' && (
					<p className={errorMessage}>{errors.email.message}</p>
				)}

				<span className={sign__fieldName}>New password</span>
				<input
					className={sign__input}
					type="password"
					name="password"
					placeholder="New password"
					ref={register({
						required: true,
						minLength: 8,
						maxLength: 40,
					})}
				/>
				{errors.username?.type === 'required' && (
					<p className={errorMessage}>Required field.</p>
				)}

				{errors.password?.type === 'minLength' && (
					<p className={errorMessage}>
						Your password needs to be at least 8 characters.
					</p>
				)}

				{errors.password?.type === 'maxLength' && (
					<p className={errorMessage}>
						Your password must not exceed 40 characters.
					</p>
				)}

				<span className={sign__fieldName}>Avatar image(url)</span>
				<input
					className={sign__input}
					type="url"
					name="image"
					placeholder="Avatar image"
					ref={register()}
				/>

				<input type="submit" value="Save" className={sign__submit} />
			</form>
		</div>
	);
};

export default EditProfile;
