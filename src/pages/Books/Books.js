import React from 'react';
import { AllBooks } from '../../components/AllBooks/AllBooks';

export const Books = ({ theme, lang }) => {
	return (
		<div>
			<AllBooks theme={theme} lang={lang} />
		</div>
	);
};
