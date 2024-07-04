import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();

	return (
		<div className="container">
			<h1>Oops...</h1>
			<p>{isRouteErrorResponse(error) ? "Invalid Page" : "Unexpected error"}</p>
			<p>
				<Link to="">Home</Link>
			</p>
		</div>
	);
};

export default Error;
