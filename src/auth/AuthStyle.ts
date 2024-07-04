import styled from "styled-components";

const FormWrapper = styled.div``;

const FormContainer = styled.div`
	max-width: 450px;
	padding: 0 20px;
	margin: 5rem auto 0 auto;
	// background-color: red;

	& h1 {
		margin: 0 0 1rem 0;
		font-size: 3.2rem;
	}
`;

const InputWrapper = styled.div`
	margin: 2.5rem 0;

	& input {
		border: 1px solid skyblue;
		padding: 0.7rem 1rem;
		border-radius: 3px;
		width: 100%;
		outline: 0px solid transparent;
		transition: all 0.2s;

		&:focus {
			outline: 1px solid skyblue;
		}
	}
`;

const FormBtn = styled.button`
	margin: 2rem 0 0 0;
	padding: 0.7rem 5rem;
	border-radius: 3px;
	background-color: rgba(135, 206, 235, 0.7);
	border: none;
	outline: 0;
	transition: all 0.2s;

	&:focus {
		border: 0;
		outline: 0;
	}

	&:hover {
		background-color: skyblue;
	}

	&:active {
		background-color: rgba(135, 206, 235, 0.7);
	}
`;

export { FormWrapper, FormContainer, InputWrapper, FormBtn };
