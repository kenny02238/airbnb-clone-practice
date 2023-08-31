import { createSlice } from "@reduxjs/toolkit";

interface isLoginModalOpenState {
  isOpen: boolean;
}

const initialState: isLoginModalOpenState = {
  isOpen: false,
};

const isLoginModalOpenSlice = createSlice({
  name: "isLoginModalOpenSlice",
  initialState,
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = isLoginModalOpenSlice.actions;
export default isLoginModalOpenSlice.reducer;
