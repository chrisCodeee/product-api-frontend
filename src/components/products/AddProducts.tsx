import { FormEvent, useState } from "react";
import { FormBtn, FormContainer, FormWrapper, InputWrapper } from "../../auth/AuthStyle";
import { addProductsStateManagement } from "../../stateManagement";
import axios from "axios";

const AddProducts = () => {
	const { product, setProduct, clearProductDetails } = addProductsStateManagement();
	const [message, setMessage] = useState({
		error: "",
		success: "",
	});

	const clearMessage = () => {
		setMessage({
			error: "",
			success: "",
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		let userId = localStorage.getItem("user");
		let token = localStorage.getItem("token");

		// To check if the user exist in our localstorage
		userId ? (userId = JSON.parse(userId)._id) : (userId = "");

		e.preventDefault();
		// console.log(product);
		// console.log(userId);

		await axios
			.post(
				"http://localhost:8080/products/add",
				{ ...product, userId },
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((res) => {
				// console.log(res.data);

				if (res.status === 200) {
					setMessage({ ...message, success: "Product added successfully!" });
					clearProductDetails();
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
					<h1>Add Product</h1>
					<p className={message.error && "text-danger"}>{message.error ? message.error : message.success}</p>

					<form action="" onSubmit={handleSubmit}>
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

						<FormBtn type="submit">Add Product</FormBtn>
					</form>
				</FormContainer>
			</FormWrapper>
		</>
	);
};

export default AddProducts;
