import React from 'react';
import { AllAuthors } from '../../components/AllAuthors/AllAuthors';
import { AllBooks } from '../../components/AllBooks/AllBooks';

export const Books = ({ theme, lang }) => {
	return (
		<div>
			<AllBooks theme={theme} lang={lang} />
		</div>
	);
};
