import axios from "axios";

export const UsersAPIs = {
  getAllUsers: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}users`);
    return response.data;
  },
  createUser: async (user) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}users`, user);
  },
  updateUserById: async (id, userUpdate) => {
    return await axios.patch(
      `${process.env.REACT_APP_BE_URL}users/${id}`,
      userUpdate
    );
  },
};
