import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Languages } from '../../Languages/Languages';
import {
	ProfilBottom,
	ProfilBottomLeft,
	ProfilBottomRight,
	ProfileButton,
	ProfileImageInput,
	ProfileImageLabel,
	ProfilForm,
	ProfilInput,
	ProfilLabel,
	ProfilTitle,
} from './ProfileChange.styled';

export const ProfileChange = ({ theme, lang }) => {
	const Token = localStorage.getItem('token');
	const [image, setImage] = useState(null);
	const userFirstName = useRef();
	const userLastName = useRef();
	const userPhone = useRef();

	const imageValue = (props) => {
		setImage(props.target.files[0]);
	};

	const handleFormSubmit = (evt) => {
		evt.preventDefault();

		let formData = new FormData();

		formData.append('first_name', userFirstName?.current.value);
		formData.append('last_name', userLastName?.current.value);
		formData.append('phone', userPhone?.current.value);
		formData.append('image', image);

		axios
			.put('http://localhost:5000/user/account', formData, {
				headers: {
					Authorization: Token,
				},
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<ProfilBottom theme={theme}>
			<ProfilForm onSubmit={handleFormSubmit}>
				<ProfilBottomRight>
					<ProfilTitle theme={theme}>My profile</ProfilTitle>
					<ProfilLabel theme={theme}>
						{Languages[lang].profile.firstName}
						<ProfilInput
							ref={userFirstName}
							type="text"
							placeholder={Languages[lang].profile.firstName}
						/>
					</ProfilLabel>
					<ProfilLabel theme={theme}>
						{Languages[lang].profile.lastName}
						<ProfilInput
							ref={userLastName}
							type="text"
							placeholder={Languages[lang].profile.lastName}
						/>
					</ProfilLabel>
					<ProfilLabel theme={theme}>
						{Languages[lang].profile.phone}
						<ProfilInput
							ref={userPhone}
							type="number"
							placeholder={Languages[lang].profile.phone}
						/>
					</ProfilLabel>
				</ProfilBottomRight>
				<ProfilBottomLeft theme={theme}>
					<ProfileImageLabel htmlFor="profileimage" />
					<ProfileImageInput
						type="file"
						id="profileimage"
						onChange={imageValue}
					/>
				</ProfilBottomLeft>
				<ProfileButton type="submit" theme={theme}>
					{Languages[lang].profile.button}
				</ProfileButton>
			</ProfilForm>
		</ProfilBottom>
	);
};
