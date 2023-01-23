import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Languages } from '../../Languages/Languages';
import { addToken } from '../../redux/token/tokenAction';
import { RegisterErrorSpan } from '../Register/Register.styled';
import {
	RegisterButton,
	RegisterDescription,
	RegisterDescriptionLink,
	RegisterForm,
	RegisterInput,
	RegisterLeftWrapper,
	RegisterRightWrapper,
	RegisterTitle,
	RegisterWrapper,
} from './Login.styled';

export const Login = ({ theme, lang }) => {
	const user_email = useRef();
	const user_password = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			axios
				.post('http://localhost:5000/user/login', {
					email: values.email,
					password: values.password,
				})
				.then((res) => {
					if (res.status === 201) {
						JSON.stringify(
							dispatch(addToken(res.data.token)),
							window.localStorage.setItem(
								'token',
								res.data.token,
							),
						);
						navigate('/');
					}
				})
				.catch((err) => console.log(err));
		},
		validate: (values) => {
			let errors = {};
			if (!values.email) {
				errors.email = 'Email required';
			}
			if (!values.password) {
				errors.password = 'Password required';
			}
			return errors;
		},
	});

	// const handleFormSubmit = (evt) => {
	// 	evt.preventDefault();

	// 	axios
	// 		.post('http://localhost:5000/user/login', {
	// 			email: user_email.current.value,
	// 			password: user_password.current.value,
	// 		})
	// 		.then((res) => {
	// 			if (res.status === 201) {
	// 				JSON.stringify(
	// 					localStorage.setItem('token', res.data.token),
	// 				);
	// 				navigate('/');
	// 			}
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	return (
		<RegisterWrapper>
			<RegisterLeftWrapper></RegisterLeftWrapper>
			<RegisterRightWrapper theme={theme}>
				<RegisterTitle theme={theme}>
					{Languages[lang].register.registerTitle}
				</RegisterTitle>
				<RegisterDescription theme={theme}>
					{Languages[lang].login.registerLink}
					<RegisterDescriptionLink to={'/register'}>
						{Languages[lang].register.registerTitle}
					</RegisterDescriptionLink>
				</RegisterDescription>
				<RegisterForm
					onSubmit={(evt) => {
						evt.preventDefault();
						formik.handleSubmit();
					}}
				>
					<RegisterInput
						type="email"
						ref={user_email}
						placeholder={Languages[lang].register.email}
						theme={theme}
						top
						required
						name="email"
						id="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.email && formik.errors.email ? (
						<RegisterErrorSpan>
							{formik.errors.email}
						</RegisterErrorSpan>
					) : null}
					<RegisterInput
						type="password"
						ref={user_password}
						placeholder={Languages[lang].register.password}
						theme={theme}
						bottom
						required
						name="password"
						id="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.password && formik.errors.password ? (
						<RegisterErrorSpan>
							{formik.errors.password}
						</RegisterErrorSpan>
					) : null}
					<RegisterButton theme={theme} type="submit">
						Next step
					</RegisterButton>
				</RegisterForm>
			</RegisterRightWrapper>
		</RegisterWrapper>
	);
};
