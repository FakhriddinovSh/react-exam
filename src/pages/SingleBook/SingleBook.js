import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SIngleAuthorItem } from '../../components/SingleAuthorItem/SIngleAuthorItem';
import { Container } from '../Home/Home.styled';
import {
	SingleAuthorCarousel,
	SingleAuthorCarouselTextOne,
	SingleAuthorCarouselTextTwo,
	SingleAuthorList,
	SingleAuthorWrapperDiv,
} from '../SingleAuthor/SingleAuthor.styled';
import {
	SingleBookArrow,
	SingleBookDescription,
	SingleBookLeftWrapper,
	SingleBookList,
	SingleBookListItem,
	SingleBookPages,
	SingleBookPagesCount,
	SingleBookRightWrapper,
	SingleBookTitle,
	SingleBookWrapper,
} from './SingleBook.styled';

export const SingleBook = ({ theme }) => {
	const params = useParams();
	const state = useSelector((state) => state);
	const [singleBook, setSingleBook] = useState([]);
	const [allBooks, setAllBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/bookId/${params.id}`, {
				headers: {
					Authorization: state.token.token,
				},
			})
			.then((res) => setSingleBook(res.data))
			.catch((err) => console.log(err));
	}, [params.id]);

	console.log(singleBook);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/author/books/${singleBook.author_id}`, {
				headers: {
					Authorization: state.token.token,
				},
			})
			.then((res) => setAllBooks(res.data))
			.catch((err) => console.log(err));
	}, [singleBook.id]);

	return (
		<Container>
			<SingleBookWrapper>
				<SingleBookLeftWrapper>
					<img
						src={`http://localhost:5000/${singleBook.image}`}
						width="505"
						height="681"
						alt="single book"
					/>
				</SingleBookLeftWrapper>
				<SingleBookRightWrapper>
					<SingleBookTitle theme={theme}>
						{singleBook.title}
					</SingleBookTitle>
					<SingleBookList>
						<SingleBookListItem>
							<SingleBookPages theme={theme}>
								Sahifalar soni:
							</SingleBookPages>
							<SingleBookPagesCount theme={theme}>
								{singleBook.page} page
							</SingleBookPagesCount>
						</SingleBookListItem>
						<SingleBookListItem>
							<SingleBookPages theme={theme}>
								Chop etilgan:
							</SingleBookPages>
							<SingleBookPagesCount theme={theme}>
								{singleBook.year} years
							</SingleBookPagesCount>
						</SingleBookListItem>
						<SingleBookListItem>
							<SingleBookPages theme={theme}>
								Kitob narxi:
							</SingleBookPages>
							<SingleBookPagesCount theme={theme}>
								${singleBook.price}
							</SingleBookPagesCount>
						</SingleBookListItem>
					</SingleBookList>
					<SingleBookArrow theme={theme}>
						To’liq ma’lumot
					</SingleBookArrow>
					<SingleBookDescription theme={theme}>
						{singleBook.description}
					</SingleBookDescription>
				</SingleBookRightWrapper>
			</SingleBookWrapper>

			<SingleAuthorWrapperDiv>
				<SingleAuthorCarousel>
					<SingleAuthorCarouselTextOne>
						Asarlari
					</SingleAuthorCarouselTextOne>
					<SingleAuthorCarouselTextTwo to={'/books/1'}>
						Hammasi
					</SingleAuthorCarouselTextTwo>
				</SingleAuthorCarousel>

				<SingleAuthorList>
					{allBooks.map((item) => (
						<SIngleAuthorItem
							image={item.image}
							title={item.title}
							author_id={item.author_id}
							theme={theme}
							path={item.id}
						/>
					))}
				</SingleAuthorList>
			</SingleAuthorWrapperDiv>
		</Container>
	);
};
