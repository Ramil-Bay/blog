import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => (
	<Loader
		type="Puff"
		color="#00BFFF"
		height={100}
		width={100}
		style={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		}}
	/>
);

export default Spinner;
