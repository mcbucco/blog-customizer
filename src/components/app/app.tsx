import { CSSProperties, useState } from 'react';

import { defaultArticleState } from 'src/constants/articleProps';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [ArticleSettings, setArticleSettings] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': ArticleSettings.fontFamilyOption.value,
					'--font-size': ArticleSettings.fontSizeOption.value,
					'--font-color': ArticleSettings.fontColor.value,
					'--container-width': ArticleSettings.contentWidth.value,
					'--bg-color': ArticleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyChanges={setArticleSettings} />
			<Article />
		</main>
	);
};
