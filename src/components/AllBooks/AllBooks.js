import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../pages/Home/Home.styled';
// import { AuthorItem } from '../AuthorItem/AuthorItem';
import CarouselBanner from '../Carousel/Carousel';
import { SIngleAuthorItem } from '../SingleAuthorItem/SIngleAuthorItem';
import {
	AllAuthorsDesc,
	AllAuthorsGenre,
	AllAuthorsGenreItem,
	AllAuthorsGenreLink,
	AllAuthorsList,
	AllAuthorsWrapper,
} from './AllBooks.styled';
import {
	SearchButton,
	SearchForm,
	SearchInput,
	SearchTitle,
	SearchWrapper,
} from '../AuthorSearch/AuthorSearch.styled';
import { Languages } from '../../Languages/Languages';
import { AuthorItem } from '../AuthorItem/AuthorItem';

export const AllBooks = ({ theme, lang }) => {
	const params = useParams();
	const [books, setBooks] = useState({
		isLoading: true,
		data: [],
		isError: false,
	});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/book/genreId/${params.id}`)
			.then((res) => {
				setBooks({
					isLoading: false,
					data: res.data,
					isError: false,
				});
			})
			.catch((err) => console.log(err));
	}, [params.id]);

	const searchBook = useRef();
	const [searchedAuthor, setSearchedAuthor] = useState([]);

	const handleFormSubmit = (evt) => {
		evt.preventDefault();
		axios
			.get(
				`http://localhost:5000/book/search?book=${searchBook.current.value}`,
			)
			.then((res) => setSearchedAuthor(res.data))
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<CarouselBanner />

			<AllAuthorsList>
				{searchedAuthor.length !== 0
					? searchedAuthor.map((item) => (
							<SIngleAuthorItem
								key={item.id}
								id={item.id}
								author_id={item.author_id}
								title={item.title}
								image={item.image}
								theme={theme}
								path={item.id}
							/>
					  ))
					: ''}
			</AllAuthorsList>

			<SearchWrapper theme={theme}>
				<SearchTitle theme={theme}>
					{Languages[lang].search.search}
				</SearchTitle>
				<SearchForm onSubmit={handleFormSubmit}>
					<SearchInput
						theme={theme}
						ref={searchBook}
						type="text"
						placeholder={Languages[lang].search.placeholder}
						required
					/>
					<SearchButton theme={theme} type="Submit">
						{Languages[lang].search.search}
					</SearchButton>
				</SearchForm>
			</SearchWrapper>

			<AllAuthorsWrapper>
				<AllAuthorsDesc>
					{Languages[lang].search.categories}
				</AllAuthorsDesc>
				<AllAuthorsGenre>
					<AllAuthorsGenreItem>
						<AllAuthorsGenreLink theme={theme} to={`/books/1`}>
							Temuriylar
						</AllAuthorsGenreLink>
					</AllAuthorsGenreItem>
					<AllAuthorsGenreItem>
						<AllAuthorsGenreLink theme={theme} to={`/books/2`}>
							Jadid adabiyoti
						</AllAuthorsGenreLink>
					</AllAuthorsGenreItem>
					<AllAuthorsGenreItem>
						<AllAuthorsGenreLink theme={theme} to={`/books/3`}>
							Sovet davri
						</AllAuthorsGenreLink>
					</AllAuthorsGenreItem>
					<AllAuthorsGenreItem>
						<AllAuthorsGenreLink theme={theme} to={`/books/4`}>
							Mustaqillik davri
						</AllAuthorsGenreLink>
					</AllAuthorsGenreItem>
				</AllAuthorsGenre>
				<AllAuthorsList>
					{books.data?.length
						? books?.data.map((item) => (
								<SIngleAuthorItem
									key={item.id}
									id={item.id}
									author_id={item.author_id}
									title={item.title}
									image={item.image}
									theme={theme}
									path={item.id}
								/>
						  ))
						: 'No books yet'}
				</AllAuthorsList>
			</AllAuthorsWrapper>
		</Container>
	);
};
