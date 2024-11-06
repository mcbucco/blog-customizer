import { CSSProperties, useState } from 'react';

import { defaultArticleState } from 'src/constants/articleProps';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [defaultArticleSettings, setDefaultArticleSettings] =
		useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': defaultArticleSettings.fontFamilyOption.value,
					'--font-size': defaultArticleSettings.fontSizeOption.value,
					'--font-color': defaultArticleSettings.fontColor.value,
					'--container-width': defaultArticleSettings.contentWidth.value,
					'--bg-color': defaultArticleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyChanges={setDefaultArticleSettings} />
			<Article />
		</main>
	);
};
