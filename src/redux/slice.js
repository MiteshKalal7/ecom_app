import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
  cart: [],
};

export const mainSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        AsyncStorage.setItem("user", JSON.stringify(action.payload));
      }
      state.user = action.payload;
    },
    setCart: (state, action) => {
      if (action.payload) {
        AsyncStorage.setItem("cart", JSON.stringify(action.payload));
      }
      state.cart = action.payload;
    },
    setToken: (state, action) => {
      if (action.payload) {
        AsyncStorage.setItem("token", action.payload);
      }
      state.token = action.payload;
    },
    handleLogout: (state, action) => {
      // AsyncStorage.clear();

      state.user = "";
      state.token = "";
      state.cart = [];
    },
  },
});

export const { setUser, setCart, setToken, handleLogout } = mainSlice.actions;

export default mainSlice.reducer;
