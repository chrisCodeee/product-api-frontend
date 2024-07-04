const User = () => {
	let user = localStorage.getItem("user");

	return (
		<div className="" style={{ maxWidth: "60vw", margin: "30px auto 0 auto" }}>
			<h1 className="mb-4">Profile</h1>
			<p>Name: {user && JSON.parse(user).name}</p>
			<p>Email Address: {user && JSON.parse(user).email}</p>
		</div>
	);
};

export default User;
