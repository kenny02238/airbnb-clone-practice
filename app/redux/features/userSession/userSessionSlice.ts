import { createSlice } from "@reduxjs/toolkit";
import { UserData, AuthDefaultUserData } from "@/app/types";

interface UserSessionState {
  userData: {
    user: UserData | undefined;
    expires: string;
    authToken: string;
  };
  userFavoriteList?: number[];
}

const initialState: UserSessionState = {
  userData: {
    user: {
      id: undefined,
      email: "",
      name: "",
      image: "",
      created_at: "",
      updated_at: "",
      favorites: [],
    },
    expires: "",
    authToken: "",
  },
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData.user = action.payload;
    },
    setToken(state, action) {
      state.userData.authToken = action.payload;
    },
    setWholeFavList(state, action) {
      state.userFavoriteList = action.payload;
    },
    setFavoriteList(state, action: { type: string; payload: number }) {
      state.userFavoriteList?.push(action.payload);
    },
    deleteFavoriteList(state, action: { type: string; payload: number }) {
      state.userFavoriteList = state.userFavoriteList?.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {
  setUser,
  setToken,
  setFavoriteList,
  setWholeFavList,
  deleteFavoriteList,
} = userSessionSlice.actions;
export default userSessionSlice.reducer;
