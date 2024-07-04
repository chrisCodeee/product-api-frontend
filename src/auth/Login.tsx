import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { InputWrapper, FormBtn, FormContainer, FormWrapper } from "./AuthStyle";
import { Link, useNavigate } from "react-router-dom";
import { Footer, NavBar } from "../components";
import { UserDetails } from "../stateManagement";

const Login = () => {
	const { userLogin, setUserLoginEmail, setUserLoginPassword } = UserDetails();
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Checks if user is already logged in
	useEffect(() => {
		const auth = localStorage.getItem("token");
		if (auth) {
			navigate("/");
		}
	}, []);

	const login = async (e: FormEvent) => {
		e.preventDefault();

		await axios
			.post("http://localhost:8080/users/login", userLogin)
			.then((res) => {
				// console.log(res);

				if (res.status === 200) {
					navigate("/");
					localStorage.setItem("user", JSON.stringify(res.data.user));
					localStorage.setItem("token", res.data.token);
					setError("");
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
						<h1>Login</h1>
						<p className="text-danger">{error}</p>
						<form action="" onSubmit={login}>
							<InputWrapper>
								<input
									type="email"
									placeholder="Email address"
									value={userLogin.email}
									onChange={(e) => {
										setUserLoginEmail(e.target.value);
										setError("");
									}}
								/>
							</InputWrapper>
							<InputWrapper>
								<input
									type="password"
									placeholder="Password"
									value={userLogin.password}
									onChange={(e) => {
										setUserLoginPassword(e.target.value);
										setError("");
									}}
								/>
							</InputWrapper>
							<p>
								Not have an account? <Link to="/users/signup">Register</Link>
							</p>
							<FormBtn type="submit">Login</FormBtn>
						</form>
					</FormContainer>
				</FormWrapper>
			</div>

			<Footer />
		</div>
	);
};

export default Login;
