import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersAPIs } from "../../../apis/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  users: [],
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  isLoading: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  errors: {},
};

export const actCreateNewUser = createAsyncThunk(
  "users/createNewUser",
  async (user, thunkAPI) => {
    try {
      const users = await UsersAPIs.getAllUsers();
      const { email } = user;
      const userFound = users.find((user) => user.email === email);
      if (userFound) {
        return thunkAPI.rejectWithValue();
      } else {
        await UsersAPIs.createUser(user);
      }
    } catch (error) {}
  }
);

export const actLogin = createAsyncThunk(
  "users/actLogin",
  async (user, thunkAPI) => {
    try {
      const users = await UsersAPIs.getAllUsers();
      const { email, password } = user;
      const userFound = users.find(
        (user) => user.email === email && user.password === password
      );
      if (userFound) {
        return {
          userInfo: userFound,
        };
      } else throw new Error();
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const actupdatePasswordById = createAsyncThunk(
  "users/actupdatePasswordById",
  async ({ id, usersUpdate }, thunkAPI) => {
    await UsersAPIs.updateUserById(id, usersUpdate);
    thunkAPI.dispatch(userInformationUpdateSuccess(usersUpdate));
    return usersUpdate;
  }
);

export const actupdateUserInformationById = createAsyncThunk(
  "users/actupdateUserInformationById",
  async ({ id, usersUpdate }, thunkAPI) => {
    await UsersAPIs.updateUserById(id, usersUpdate);
    thunkAPI.dispatch(userInformationUpdateSuccess(usersUpdate));
    return usersUpdate;
  }
);

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    userInformationUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    actLogout: (state, _) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.userInfo = null;
      toast(
        <div className="text-center fw-bold text-success">
          Đăng xuất khỏi tài khoản thành công!
        </div>
      );
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("userInfo", JSON.stringify(null));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actCreateNewUser.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(actCreateNewUser.rejected, (state, _) => {
      state.errors = {};
      toast(
        <div className="text-center fw-bold text-danger">Email đã tồn tại!</div>
      );
      state.isLoading = false;
    });
    builder.addCase(actCreateNewUser.fulfilled, (state, _) => {
      toast(
        <div className="text-center fw-bold text-success">
          <div>Tạo tài khoản thành công!</div>
          <div>Vui lòng đăng nhập để mua sắm!</div>
        </div>
      );
      state.isLoading = false;
    });
    builder.addCase(actLogin.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = {};
      toast(
        <div className="text-center fw-bold text-danger">
          Tên đăng nhập hoặc mật khẩu không đúng!
        </div>
      );
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      const { userInfo } = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userInfo = { ...userInfo };
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    });
  },
});

export const { setLoading, userInformationUpdateSuccess, actLogout } =
  authSlice.actions;
export default authSlice.reducer;
