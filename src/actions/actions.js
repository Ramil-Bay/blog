import { getArticles, getArticlesCount, getArticle } from './articlesActions';
import addDefaultValue from './defaultValueActions';
import {
	addArticlesTag,
	addNewTag,
	deleteTag,
	deleteAllTag,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
} from './tagActions';
import addUserInfo from './userActions';

export {
	getArticles,
	getArticlesCount,
	getArticle,
	addDefaultValue,
	addArticlesTag,
	addNewTag,
	deleteTag,
	deleteAllTag,
	addUserInfo,
	changeTagValue,
	changeFocus,
	repeatTag,
	notRepeatTag,
};
