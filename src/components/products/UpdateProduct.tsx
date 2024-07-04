import axios from "axios";
import { useEffect, useState } from "react";
import { FormWrapper, FormContainer, InputWrapper, FormBtn } from "../../auth/AuthStyle";
import { addProductsStateManagement } from "../../stateManagement";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "./Products";

const UpdateProduct = () => {
	const { product, setProduct, clearProductDetails } = addProductsStateManagement();
	const [message, setMessage] = useState({
		error: "",
		success: "",
	});

	const navigate = useNavigate();

	// To get the parameters from the url
	const params = useParams();
	// console.log(params);

	const clearMessage = () => {
		setMessage({
			error: "",
			success: "",
		});
	};
	let userId = localStorage.getItem("user");
	let token = localStorage.getItem("token");

	// To check if the user exist in our localstorage
	userId ? (userId = JSON.parse(userId)._id) : (userId = "");

	useEffect(() => {
		getProductDetails();
	}, []);

	const getProductDetails = () => {
		axios
			.get<ProductType>(`http://localhost:8080/products/views/${params.userId}/${params.productId}`)
			.then((res) => {
				// console.log(res.data);
				// setProduct(res.data);

				if (res.status === 200) {
					setProduct("name", res.data.name);
					setProduct("price", res.data.price.toString());
					setProduct("category", res.data.category);
					setProduct("company", res.data.company);
				}
			})
			.catch((err) => {
				console.log(err);
				// setMessage({ ...message, error: err.response.data });
			});
	};

	const updateProduct = () => {
		axios
			.put(`http://localhost:8080/products/views/${params.userId}/${params.productId}`, product, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				// console.log(res.data);
				// setProduct(res.data);

				if (res.status === 200) {
					setMessage({ ...message, success: "Product updated successfully!" });
					clearProductDetails();
					navigate("/");
				}
			})
			.catch((err) => {
				console.log(err);
				setMessage({ ...message, error: err.response.data });
			});
	};

	return (
		<>
			<FormWrapper>
				<FormContainer>
					<h1>Update Product</h1>
					<p className={message.error && "text-danger"}>{message.error ? message.error : message.success}</p>

					<div>
						<InputWrapper>
							<input
								type="text"
								placeholder="Name"
								name="name"
								value={product.name}
								onChange={(e) => {
									setProduct(e.target.name, e.target.value);
									clearMessage();
								}}
							/>
						</InputWrapper>
						<InputWrapper>
							<input
								type="text"
								placeholder="Price"
								name="price"
								value={product.price}
								onChange={(e) => {
									setProduct(e.target.name, e.target.value);
									clearMessage();
								}}
							/>
						</InputWrapper>

						<InputWrapper>
							<input
								type="text"
								placeholder="Category"
								name="category"
								value={product.category}
								onChange={(e) => {
									setProduct(e.target.name, e.target.value);
									clearMessage();
								}}
							/>
						</InputWrapper>

						<InputWrapper>
							<input
								type="text"
								placeholder="Company"
								name="company"
								value={product.company}
								onChange={(e) => {
									setProduct(e.target.name, e.target.value);
									clearMessage();
								}}
							/>
						</InputWrapper>
						<div>
							<FormBtn
								type="submit"
								onClick={() => {
									updateProduct();
								}}>
								Update Product
							</FormBtn>
							<FormBtn style={{ marginLeft: "20px" }} onClick={() => navigate("/")}>
								Cancel
							</FormBtn>
						</div>
					</div>
				</FormContainer>
			</FormWrapper>
		</>
	);
};

export default UpdateProduct;
