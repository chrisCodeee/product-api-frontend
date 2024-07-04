import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export type ProductType = {
	_id: string;
	name: string;
	category: string;
	company: string;
	price: number;
};

const Products = () => {
	// const [search, setSearch] = useState<string>("");
	const [products, setProducts] = useState<ProductType[]>([]);
	const [error, setError] = useState<string>();
	let userId = localStorage.getItem("user");
	let token = localStorage.getItem("token");

	const sumAmount = products.reduce((acc, products) => products.price + acc, 0);

	// To check if the user exist in our localstorage
	userId ? (userId = JSON.parse(userId)._id) : (userId = "");

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = () => {
		axios
			.get(`http://localhost:8080/products/views/${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setProducts(res.data);
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	const deleteItem = (productId: string) => {
		axios
			.delete(`http://localhost:8080/products/views/${userId}/${productId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res.data);
				setProducts(res.data);
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};

	const searchProducts = (search: string) => {
		if (!search) return getProducts();
		axios
			.get(`http://localhost:8080/products/search/${search}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				console.log(res);

				if (res.status === 200) {
					setProducts(res.data);
				}
			})
			.catch((err) => {
				console.log(err);

				if (err.response.status === 404) {
					setError("No product found");
				}
			});
	};

	return (
		<>
			{products.length > 0 ? (
				<div style={{ maxWidth: "1000px", margin: "20px auto" }}>
					<h1 className="text-center mb-4">Product List</h1>
					<div className="text-center mb-5">
						<input
							type="text"
							name=""
							id=""
							placeholder="Search"
							style={{ width: "50%", padding: ".5rem 1.5rem" }}
							// value={search}
							onChange={(e) => {
								// setSearch();
								searchProducts(e.target.value);
								setError("");
							}}
						/>
						{/* <button onClick={searchProducts}>Search</button> */}
					</div>
					{error && <p>{error}</p>}
					{!error && (
						<>
							<table className="d-none d-md-table table table-bordered">
								<thead>
									<tr>
										<th className="ps-5">S/N</th>
										<th className="ps-5">Product Name</th>
										<th className="ps-5">Price</th>
										<th className="ps-5">Category</th>
										<th className="ps-5">Company</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{products.map((item, index) => (
										<tr key={index}>
											<td className="ps-5">{index + 1}</td>
											<td className="ps-5">{item.name}</td>
											<td className="ps-5">{item.price}</td>
											<td className="ps-5">{item.category}</td>
											<td className="ps-5">{item.company}</td>
											<td className="text-center">
												<button className="btn btn-outline-danger" style={{ fontSize: "inherit" }} onClick={() => deleteItem(item._id)}>
													Delete
												</button>
											</td>
											<td className="text-center">
												<Link to={`/update-product/${userId}/${item._id}`} className="btn btn-outline-danger" style={{ fontSize: "inherit" }}>
													Update
												</Link>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<td className="ps-5">Total</td>
										<td></td>
										<td className="ps-5">${sumAmount}</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tfoot>
							</table>

							<div className="row d-md-none mb-5 ps-5">
								{products.map((item, index) => (
									<div className="mb-5 col-12 col-sm-6" key={item._id}>
										<p>S/N: {index + 1}</p>
										<p>Product Name: {item.name}</p>
										<p>Price: {item.price}</p>
										<p>Category: {item.category}</p>
										<p>Company: {item.company}</p>

										<div>
											<button className="btn btn-outline-danger" style={{ fontSize: "inherit" }} onClick={() => deleteItem(item._id)}>
												Delete
											</button>
											<Link to={`/update-product/${userId}/${item._id}`} className="btn btn-outline-danger" style={{ fontSize: "inherit" }}>
												Update
											</Link>
										</div>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			) : (
				<p>No Product Found</p>
			)}
		</>
	);
};

export default Products;
