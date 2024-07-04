import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { InputWrapper, FormBtn, FormContainer, FormWrapper } from "./AuthStyle";
import { Link, useNavigate } from "react-router-dom";
import { Footer, NavBar } from "../components";
import { UserDetails } from "../stateManagement";

const SignUp = () => {
	const { user, setUserEmail, setUserName, setUserPassword, clearUserInput } = UserDetails();
	const [isSignUpSucess, setIsSignUpSuccess] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Checks if user is already logged in
	useEffect(() => {
		const auth = localStorage.getItem("user");
		if (auth) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await axios
			.post("http://localhost:8080/users/signup", user)
			.then((res) => {
				// console.log(res.data);

				if (res.status === 200) {
					setIsSignUpSuccess(true);
					clearUserInput();
					setError("");
					navigate("/");
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.data.token);
					return;
				}
			})
			.catch((err) => {
				setError(err.response.data);
				console.log(err);
			});
	};

	return (
		<div className="app">
			<div>
				<NavBar />
				<FormWrapper>
					<FormContainer>
						<h1>Register</h1>
						<p className="text-danger">{error}</p>
						{isSignUpSucess && <p>Sign in Sucessfully!</p>}
						<form action="" onSubmit={handleSubmit}>
							<InputWrapper>
								<input
									type="text"
									placeholder="Name"
									value={user.name}
									onChange={(e) => {
										setUserName(e.target.value);
										setIsSignUpSuccess(false);
										setError("");
									}}
								/>
							</InputWrapper>
							<InputWrapper>
								<input
									type="email"
									placeholder="Email address"
									value={user.email}
									onChange={(e) => {
										setUserEmail(e.target.value);
										setIsSignUpSuccess(false);
										setError("");
									}}
								/>
							</InputWrapper>
							<InputWrapper>
								<input
									type="password"
									placeholder="Password"
									value={user.password}
									onChange={(e) => {
										setUserPassword(e.target.value);
										setIsSignUpSuccess(false);
										setError("");
									}}
								/>
							</InputWrapper>
							<p>
								Already have an account? <Link to="/users/login">Login</Link>
							</p>
							<FormBtn type="submit">Sign Up</FormBtn>
						</form>
					</FormContainer>
				</FormWrapper>
			</div>

			<Footer />
		</div>
	);
};

export default SignUp;
