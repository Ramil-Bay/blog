import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

import SignService from '../../api/SignService';
import ErrorMessages from '../../errorMessages/errorMessages';

import classes from './SignUp.module.scss';

const SignUp = ({ addUserInfo, history }) => {
	const signService = new SignService();

	const errorMessages = new ErrorMessages();

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
	} = classes;

	const { register, handleSubmit, errors, setError, clearErrors } = useForm();

	const onSubmit = (data) => {
		clearErrors(['username', 'email', 'password', 'repeatPass', 'agree']);
		const { password, repeatPass } = data;
		if (password === repeatPass) {
			signService.signUp(data).then((res) => {
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
						});
					}
				} else {
					const { token, bio, image, email, username } = res.user;
					localStorage.setItem('token', token);
					localStorage.setItem('username', username);
					addUserInfo({ bio, image, email, username });
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
				{errorMessages.usernameError(errors.username?.type)}

				<span className={sign__fieldName}>Email addres</span>
				<input
					placeholder="Email addres"
					name="email"
					type="email"
					className={sign__input}
					ref={register({ required: true })}
				/>
				{errorMessages.emailError(errors.email?.type)}

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
				{errorMessages.passwordError(errors.password?.type)}

				<span className={sign__fieldName}>Repeat Password</span>
				<input
					placeholder="Password"
					name="repeatPass"
					type="password"
					className={sign__input}
					ref={register({ required: true })}
				/>
				{errorMessages.repeatPasswordError(errors.repeatPass?.type)}

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
				{errorMessages.agreement(errors.agree?.type)}

				<input type="submit" value="Create" className={sign__submit} />
			</form>
			<span className={sign__text}>
				Already have an account? <Link to="/sign-in">Sign In.</Link>
			</span>
		</div>
	);
};

export default withRouter(SignUp);
