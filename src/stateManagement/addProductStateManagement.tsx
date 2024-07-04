import { create } from "zustand";

export type Products = {
	name: string;
	price: string;
	category: string;
	company: string;
};

interface ProductProps {
	product: Products;
	productId: string;
	setProduct: (productName: string, productValue: string) => void;
	setProductId: (productId: string) => void;
	clearProductDetails: () => void;
}

const AddProductStateManagement = create<ProductProps>((set) => ({
	product: {
		name: "",
		price: "",
		category: "",
		company: "",
	},

	productId: "",

	// To set the details to send as post request during Register
	setProduct: (productName, productValue) => set((store) => ({ product: { ...store.product, [productName]: productValue } })),
	setProductId: (productId) => set(() => ({ productId: productId })),
	clearProductDetails: () => set(() => ({ product: { name: "", price: "", category: "", company: "" } })),
}));

export default AddProductStateManagement;
