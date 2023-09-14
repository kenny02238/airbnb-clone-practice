import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserData, AuthDefaultUserData } from "@/app/types";

interface UserSessionState {
  userData: {
    user: (UserData & AuthDefaultUserData) | undefined;
    expires: string;
    authToken: string;
  };
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
  },
});

export const { setUser, setToken } = userSessionSlice.actions;
export default userSessionSlice.reducer;
