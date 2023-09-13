import axios from "axios";

export const CommentsAPIs = {
  getAllComments: async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}comments`,
      {
        params: {
          _sort: "createAt",
          _order: "desc",
          ...params,
        },
      }
    );
    return response.data;
  },
  createComment: async (comment) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}comments`, comment);
  },
};
