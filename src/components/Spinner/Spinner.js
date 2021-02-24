import React from 'react';
import Loader from 'react-loader-spinner';

import classes from './Spinner.module.scss';

const Spinner = () => (
	<Loader
		type="Puff"
		color="#00BFFF"
		height={100}
		width={100}
		className={classes.spinner}
	/>
);

export default Spinner;
