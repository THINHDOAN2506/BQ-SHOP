import axios from "axios";

export const ProductAPIs = {
  getAllProducts: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}products`,
      {
        params: {
          _sort: "createAt",
          _order: "desc",
          ...params,
        },
      }
    );
    return response;
  },
  getProductById: async (productId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}products/${productId}`
    );
    return response.data;
  },
};
