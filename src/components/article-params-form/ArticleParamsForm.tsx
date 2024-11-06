import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
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
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type formProps = {
	applyChanges: ({
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	}: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	}) => void;
};

export const ArticleParamsForm = (props: formProps) => {
	const [visible, setVisible] = useState(false);
	const asideRef = useRef(null);
	const showForm = () => {
		setVisible(true);
	};

	const handleSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setVisible(false);
		props.applyChanges(newArticleSettings);
	};

	const handleReset = () => {
		setNewArticleSettings(defaultArticleState);
		props.applyChanges(defaultArticleState);
	};

	useOutsideClickClose({
		onChange: setVisible,
		isOpen: visible,
		rootRef: asideRef,
	});

	const [newArticleSettings, setNewArticleSettings] =
		useState(defaultArticleState);

	return (
		<>
			<ArrowButton isOpen={visible} onClick={showForm} />
			<aside
				className={clsx(styles.container, visible && styles.container_open)}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} size={31} uppercase as={'h3'}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={newArticleSettings.fontFamilyOption}
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
						selected={newArticleSettings.fontSizeOption}
						onChange={(value) => {
							setNewArticleSettings({
								...newArticleSettings,
								fontSizeOption: value,
							});
						}}
					/>
					<Select
						title='цвет шрифта'
						selected={newArticleSettings.fontColor}
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
						selected={newArticleSettings.backgroundColor}
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
						selected={newArticleSettings.contentWidth}
						options={contentWidthArr}
						onChange={(selected) => {
							setNewArticleSettings({
								...newArticleSettings,
								contentWidth: selected,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
