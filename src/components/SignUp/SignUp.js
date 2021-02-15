import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

import ApiService from '../../API/ApiService';

import classes from './SignUp.module.scss';

const SignUp = ({ addUserInfo, history }) => {
	const apiService = new ApiService();

	const { registration: registerFunc } = apiService;

	const {
		sign,
		sign__form,
		sign__header,
		sign__input,
		sign__fieldName,
		sign__submit,
		registration__checkbox,
		sign__text,
		registration__agree,
		errorMessage,
	} = classes;

	const { register, handleSubmit, errors, setError, clearErrors } = useForm();

	const onSubmit = (data) => {
		clearErrors(['username', 'email', 'password', 'repeatPass', 'agree']);
		const { password, repeatPass } = data;
		if (password === repeatPass) {
			registerFunc(data).then((res) => {
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
					localStorage.setItem('username', username);
					addUserInfo({ token, bio, image, email, username });
					history.push('/articles');
				}
			});
		} else {
			setError('password', {
				type: 'notMatch',
				message: 'Passwords do not match',
			});
			setError('repeatPass', {
				type: 'notMatch',
				message: 'Passwords do not match',
			});
		}
	};

	return (
		<div className={sign}>
			<h1 className={sign__header}>Create new account</h1>
			<form className={sign__form} onSubmit={handleSubmit(onSubmit)}>
				<span className={sign__fieldName}>Username</span>
				<input
					placeholder="Username"
					name="username"
					type="text"
					className={sign__input}
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

				<span className={sign__fieldName}>Email addres</span>
				<input
					placeholder="Email addres"
					name="email"
					type="email"
					className={sign__input}
					ref={register({ required: true })}
				/>

				{errors.email?.type === 'taken' && (
					<p className={errorMessage}>{errors.email.message}</p>
				)}

				{errors.email?.type === 'required' && (
					<p className={errorMessage}>Required field.</p>
				)}

				<span className={sign__fieldName}>Password</span>
				<input
					placeholder="Password"
					name="password"
					type="password"
					className={sign__input}
					ref={register({
						required: true,
						minLength: 8,
						maxLength: 40,
					})}
				/>

				{errors.password?.type === 'required' && (
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

				{errors.password?.type === 'notMatch' && (
					<p className={errorMessage}>{errors.password.message}</p>
				)}

				<span className={sign__fieldName}>Repeat Password</span>
				<input
					placeholder="Password"
					name="repeatPass"
					type="password"
					className={sign__input}
					ref={register({ required: true })}
				/>

				{errors.password?.type === 'notMatch' && (
					<p className={errorMessage}>{errors.password.message}</p>
				)}

				<div className={registration__checkbox}>
					<input
						name="agree"
						type="checkbox"
						className={registration__agree}
						ref={register({ required: true })}
					/>
					<span>
						I agree to the processing of my personal information
					</span>
				</div>
				{errors.agree?.type === 'required' && (
					<p className={errorMessage}>
						To continue you need to accept the agreement.
					</p>
				)}

				<input type="submit" value="Create" className={sign__submit} />
			</form>
			<span className={sign__text}>
				Already have an account? <Link to="/sign-in">Sign In.</Link>
			</span>
		</div>
	);
};

export default withRouter(SignUp);
