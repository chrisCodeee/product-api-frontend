import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./pages/Error";
import { Login, SignUp } from "./auth";
import { AddProducts, Products, UpdateProducts } from "./components/products";
import { User } from "./components";

const route = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{ path: "/", element: <Products /> },
			{ path: "/add-product", element: <AddProducts /> },
			{ path: "/update-product/:userId/:productId", element: <UpdateProducts /> },
			{ path: "/profile", element: <User /> },
		],
	},

	{ path: "/users/signup", element: <SignUp /> },
	{ path: "/users/login", element: <Login /> },
]);

export default route;
