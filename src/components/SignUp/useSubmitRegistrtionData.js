import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import SignService from '../../api/SignService';
import addUserInfo from '../../actions/userActions';

const useSubmitRegistrtionData = ({ registrData, saveUserInfo, history }) => {
	const signService = new SignService();

	const { setError, clearErrors } = useForm();

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
							message: 'has already been taken',
						});
					}
				} else {
					const { token, bio, image, email, username } = res.user;
					localStorage.setItem('token', token);
					localStorage.setItem('username', username);
					saveUserInfo({ bio, image, email, username });
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

	useEffect(() => {
		onSubmit(registrData);
	}, []);
};

const mapDispatchToProps = () => ({
	saveUserInfo: addUserInfo,
});

export default connect(null, mapDispatchToProps)(useSubmitRegistrtionData);
