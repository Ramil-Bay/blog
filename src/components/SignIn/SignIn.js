import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ApiService from '../../API/ApiService';
import * as actions from '../../actions/userActions';

import classes from './SignIn.module.scss';

const SignIn = ({user, userInfo, history}) => {

	const apiService = new ApiService;

	const { sign, sign__form, sign__header, sign__input, sign__fieldName, sign__submit, sign__text, errorMessage } = classes;

	const { register, handleSubmit, watch, errors, setError, clearErrors } = useForm();

	const onSubmit = data => {
		apiService.signIn(data)
		.then(res => {
			if (res.errors) {
				console.log(res.errors);
				setError('password', {type: 'invalid', message: 'Login or password is invalid'});
			} else {
				const { token, bio, image, email, username } = res.user;
				localStorage.setItem('token', token);
				userInfo({token, bio, image, email, username});
				history.push('/articles');
			}
		})
	}

	return (
		<div className={ sign }>
			<h1 className={ sign__header }>Sign in</h1>
			<form className={ sign__form } onSubmit={handleSubmit(onSubmit)} >
				{errors.password?.type === "invalid" && <p className={ errorMessage }>{errors.password.message}</p>}
				<span className={ sign__fieldName } >Email addres</span>
				<input name="email" type="email" className={ sign__input } placeholder="Email addres"
				ref={register({ required: true })}/>

				<span className={ sign__fieldName } >Password</span>
				<input name="password" type="password" className={ sign__input } placeholder="Password"
				ref={register({ required: true, minLength: 8, maxLength: 40})}/>

				{errors.password?.type === "minLength" && (<p className={ errorMessage }>
				Your password needs to be at least 8 characters.</p>)}

				<input type="submit" value="Login" className={ sign__submit } />
				<span className={ sign__text }>Don’t have an account? <Link to="/sign-up">Sign Up.</Link></span>
			</form>
		</div>
	)
}

const mapStateToProps = (state) => ({
	user: state,
});

export default connect(mapStateToProps, actions)(withRouter(SignIn));