import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultPageSettings = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	const [defaultArticleSettings, setDefaultArticleSettings] =
		useState(defaultPageSettings);
	const [newArticleSettings, setNewArticleSettings] =
		useState(defaultArticleState);

	return (
		<main className={clsx(styles.main)} style={defaultArticleSettings}>
			<ArticleParamsForm
				handleSubmit={() => {
					setDefaultArticleSettings({
						'--font-family': newArticleSettings.fontFamilyOption.value,
						'--font-size': newArticleSettings.fontSizeOption.value,
						'--font-color': newArticleSettings.fontColor.value,
						'--container-width': newArticleSettings.contentWidth.value,
						'--bg-color': newArticleSettings.backgroundColor.value,
					} as CSSProperties);
				}}
				handleReset={() => {
					setDefaultArticleSettings(defaultPageSettings);
					setNewArticleSettings(defaultArticleState);
				}}>
				<Text weight={800} size={31} uppercase as={'h3'}>
					Задайте параметры
				</Text>
				<Select
					title='шрифт'
					selected={newArticleSettings.fontFamilyOption ?? fontFamilyOptions[0]}
					options={fontFamilyOptions}
					onChange={(selected) =>
						setNewArticleSettings({
							...newArticleSettings,
							fontFamilyOption: selected,
						})
					}
				/>
				<RadioGroup
					title='размер'
					name='font-size'
					options={fontSizeOptions}
					selected={newArticleSettings.fontSizeOption ?? fontSizeOptions[0]}
					onChange={(value) => {
						setNewArticleSettings({
							...newArticleSettings,
							fontSizeOption: value,
						});
					}}
				/>
				<Select
					title='цвет шрифта'
					selected={newArticleSettings.fontColor ?? fontColors[0]}
					options={fontColors}
					onChange={(selected) => {
						setNewArticleSettings({
							...newArticleSettings,
							fontColor: selected,
						});
					}}
				/>
				<Separator />
				<Select
					title='цвет фона'
					selected={newArticleSettings.backgroundColor ?? backgroundColors[0]}
					options={backgroundColors}
					onChange={(selected) => {
						setNewArticleSettings({
							...newArticleSettings,
							backgroundColor: selected,
						});
					}}
				/>
				<Select
					title='Ширина контента'
					selected={newArticleSettings.contentWidth ?? contentWidthArr[0]}
					options={contentWidthArr}
					onChange={(selected) => {
						setNewArticleSettings({
							...newArticleSettings,
							contentWidth: selected,
						});
					}}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
