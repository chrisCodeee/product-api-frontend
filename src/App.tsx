import { Footer, NavBar } from "./components";
import "./App.css";
import { Navigate, Outlet } from "react-router-dom";

const App = () => {
	const auth = localStorage.getItem("token"); //To protect our routes. If the user is logged in, they can access other links. If not, they are redirected to sign up page

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		localStorage.clear();
	// 	}, 5000);
	// }, []);

	return auth ? (
		<div className="app">
			<div>
				<NavBar />
				<div>
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	) : (
		<Navigate to="/users/signup" />
	);
};

export default App;
