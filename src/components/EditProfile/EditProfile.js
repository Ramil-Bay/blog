import React from 'react';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import UserService from '../../api/UserService';
import ErrorMessages from '../../errorMessages/errorMessages';

import classes from './EditProfile.module.scss';

const EditProfile = ({ addUserInfo, userInfo }) => {
	const userService = new UserService();

	const errorMessages = new ErrorMessages();

	const {
		sign,
		sign__form,
		sign__header,
		sign__input,
		sign__fieldName,
		sign__submit,
	} = classes;

	const { register, handleSubmit, errors, setError } = useForm();

	const success = () => {
		message.success('Your profile has been successfully updated', 3);
	};

	const onSubmit = (data) => {
		userService
			.changeUserData(data, localStorage.getItem('token'))
			.then((res) => {
				if (res.errors && res.errors.email) {
					setError('email', {
						type: 'taken',
						message: 'has already been taken',
					});
				}
				if (res.errors && res.errors.username) {
					setError('username', {
						type: 'taken',
						message: 'has already been taken',
					});
				} else {
					const { token, bio, image, email, username } = res.user;
					localStorage.setItem('token', token);
					localStorage.setItem('username', username);
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
					defaultValue={userInfo.username}
				/>
				{errorMessages.usernameError(errors.username?.type)}

				<span className={sign__fieldName}>New Email address</span>
				<input
					className={sign__input}
					type="email"
					name="email"
					placeholder="Email address"
					ref={register({ required: true })}
					defaultValue={userInfo.email}
				/>
				{errorMessages.emailError(errors.email?.type)}

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
				{errorMessages.passwordError(errors.password?.type)}

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
