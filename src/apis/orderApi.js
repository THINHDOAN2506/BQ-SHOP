import axios from "axios";

export const OrderAPIs = {
  getAllOders: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}orders`, {
      params: {
        _sort: "createAt",
        _order: "desc",
        ...params,
      },
    });
    return response.data;
  },
  createOrder: async (order) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}orders`, order);
  },
};
