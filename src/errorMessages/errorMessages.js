import React from 'react';

import classes from './errorMessages.module.scss';

export default class ErrorMessages {
	messageWrapper(messageText) {
		return <p className={classes.errorMessage}>{messageText}</p>;
	}

	usernameError(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			case 'minLength':
				return this.messageWrapper(
					'Your username needs to be at least 3 characters.'
				);
			case 'maxLength':
				return this.messageWrapper(
					'Your username must not exceed 20 characters.'
				);
			case 'taken':
				return this.messageWrapper('Has already been taken.');
			default:
				return null;
		}
	}

	emailError(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			case 'taken':
				return this.messageWrapper('Has already been taken.');
			default:
				return null;
		}
	}

	passwordError(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			case 'minLength':
				return this.messageWrapper(
					'Your password needs to be at least 8 characters.'
				);
			case 'maxLength':
				return this.messageWrapper(
					'Your password must not exceed 40 characters.'
				);
			case 'notMatch':
				return this.messageWrapper('Passwords do not match.');
			default:
				return null;
		}
	}

	repeatPasswordError(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			case 'notMatch':
				return this.messageWrapper('Passwords do not match.');
			default:
				return null;
		}
	}

	agreement(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			default:
				return null;
		}
	}

	articleFormError(errorType) {
		switch (errorType) {
			case 'required':
				return this.messageWrapper('Required field.');
			default:
				return null;
		}
	}
}
