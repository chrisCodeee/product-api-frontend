import { Link, useNavigate } from "react-router-dom";
import { List, ListItems, Nav } from "./NavBarStyle";
import { UserDetails } from "../../stateManagement";
import { FiMenu } from "react-icons/fi";

const NavBar = () => {
	const { clearUserDetails } = UserDetails();
	const auth = localStorage.getItem("token");
	const userAuth = localStorage.getItem("user");
	const navigate = useNavigate();

	const navLinks = [
		{ id: 1, name: "Products", link: "/" },
		{ id: 2, name: "Add Products", link: "/add-product" },
		{ id: 3, name: "Update Products", link: "/" },
		{ id: 4, name: "Profile", link: "/profile" },
		{ id: 5, name: auth ? "Logout" : "Sign Up", link: "/users/signup" },
	];

	const logout = () => {
		localStorage.clear();
		clearUserDetails();
		navigate("/users/login");
	};

	return (
		<Nav>
			<List>
				<div className="d-none d-md-flex">Logo</div>

				{auth ? (
					<>
						<div className="d-none d-md-flex">
							{navLinks.map((item) => (
								<ListItems
									key={item.id}
									onClick={() => {
										item.name === "Logout" && logout();
									}}>
									<Link to={item.link}>{item.name}</Link>
								</ListItems>
							))}
						</div>

						<div className="d-flex d-md-none">
							<FiMenu size={25} />
						</div>

						<div className="ms-auto pe-5" style={{ cursor: "pointer", color: "#fff" }} onClick={logout}>
							({userAuth && JSON.parse(userAuth).name})
						</div>
					</>
				) : (
					<div className="ms-auto d-flex pe-5">
						<ListItems>
							<Link to="/users/signup">Sign Up</Link>
						</ListItems>
						<ListItems>
							<Link to="/users/login">Log in</Link>
						</ListItems>
					</div>
				)}
			</List>
		</Nav>
	);
};

export default NavBar;
