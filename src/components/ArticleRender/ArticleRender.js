import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import Article from '../Article';
import * as actions from '../../actions/articlesActions';
import ApiService from '../../API/ApiService';

const ArticleRender = ({ slug, articlesInfo, getArticle }) => {

	const apiService = new ApiService();

	useEffect(() => {
		apiService.getArticle(slug, localStorage.getItem('token'))
		.then(res => getArticle(res));

		return () => {
			getArticle(null);
		}
	}, [slug])

	const renderComponent = articlesInfo.article ? <Article slug={slug}/> : 
	(<Loader 
		type="Puff" 
		color="#00BFFF" 
		height={100} 
		width={100}	
		style={{position: 'absolute', top: '50%', left: '50%', marginRight: '-50%', transform: 'translate(-50%, -50%)'}}
	/>)

	return renderComponent;
}

const mapStateToProps = (state) => ({
	articlesInfo: state.articlesReducer,
});

export default connect(mapStateToProps, actions)(ArticleRender);