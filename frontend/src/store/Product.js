import {create} from "zustand";

export const useProductStore = create((set) => ({
    products:[],
    setProducts: (products) => set(products),
    createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct), 
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},

	fetchProduct: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set((state) => ({ products: data.data }));
	},

	deleteProduct: async (id) => {
		const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        const data = await res.json();
		if(!data.success) return {
			success:false,message:data.message
		};
		set((state) => ({ products: state.products.filter((product) => product._id!== id) }));
		return {success: true, message: data.message};
	},

	editProduct:  async (id, updatedProduct) => {
		const res = await fetch(`/api/products/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === id ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));