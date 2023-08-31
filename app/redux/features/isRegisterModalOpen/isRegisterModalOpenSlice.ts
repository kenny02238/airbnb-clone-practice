import { createSlice } from "@reduxjs/toolkit";

interface isRegisterModalOpenState {
  isOpen: boolean;
}
const initialState: isRegisterModalOpenState = {
  isOpen: false,
};
const isRegisterModalOpenSlice = createSlice({
  name: "isRegisterModalOpen",
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

export const { onOpen, onClose } = isRegisterModalOpenSlice.actions;
export default isRegisterModalOpenSlice.reducer;
