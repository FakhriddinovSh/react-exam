import React from 'react';
import {
	AuthorDeadDate,
	AuthorName,
	InnerLink,
	Item,
	ItemImage,
	ItemInnerWrapper,
} from './AuthorItem.styled';
import AbdullaQodiriy from '../../assets/images/abdulla-qodiriy.jpg';

export const AuthorItem = ({
	theme,
	image,
	name,
	birth_date,
	death_date,
	last_name,
	id,
}) => {
	return (
		<Item theme={theme}>
			<InnerLink to={`/singleAuthor/${id}`}>
				<ItemImage
					src={`http://localhost:5000/${image}`}
					alt={`${name}`}
				/>
				<ItemInnerWrapper>
					<AuthorName theme={theme}>
						{name + ' ' + last_name}
					</AuthorName>
					<AuthorDeadDate theme={theme}>
						<span>{birth_date}</span>-<span>{death_date}</span>
					</AuthorDeadDate>
				</ItemInnerWrapper>
			</InnerLink>
		</Item>
	);
};
