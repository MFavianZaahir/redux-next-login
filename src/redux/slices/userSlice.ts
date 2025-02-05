import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

const initialState: {
  users: User[];
  loggedInUser: User | null;
  status: string;
} = {
  users: [],
  loggedInUser: null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      const { email, password } = action.payload;
      state.users.push({ name: action.payload.name, email, password });

    },
    login: (state, action) => {
      const user = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;
export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;