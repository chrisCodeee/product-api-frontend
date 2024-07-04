import { Footer, NavBar } from "./components";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
	// const auth = localStorage.getItem("token"); //To protect our routes. If the user is logged in, they can access other links. If not, they are redirected to sign up page
	// const auth = localStorage.getItem("token");

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		localStorage.clear();
	// 	}, 5000);
	// }, []);

	return (
		<div className="app">
			<div>
				<NavBar />
				H1
				<div>
					<Outlet />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default App;
