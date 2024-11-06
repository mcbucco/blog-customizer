import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { ReactNode, SyntheticEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = ({
	children,
	handleReset,
	handleSubmit,
}: {
	children: ReactNode;
	handleReset: () => void;
	handleSubmit: () => void;
}) => {
	const [visible, setVisible] = useState(false);
	const asideRef = useRef(null);
	const showForm = () => setVisible(true);
	useOutsideClickClose({
		onChange: setVisible,
		isOpen: visible,
		rootRef: asideRef,
	});

	return (
		<>
			<ArrowButton isOpen={false} onClick={showForm} />
			<aside
				className={clsx(styles.container, visible && styles.container_open)}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(evt: SyntheticEvent) => {
						evt.preventDefault();
						setVisible(false);
						handleSubmit();
					}}
					onReset={handleReset}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
