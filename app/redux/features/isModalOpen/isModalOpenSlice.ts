import { createSlice } from "@reduxjs/toolkit";

interface isModalOpenState {
  isOpen: boolean;
}
const initialState: isModalOpenState = {
  isOpen: false,
};
const isModalOpenSlice = createSlice({
  name: "isModalOpen",
  initialState,
  reducers: {
    onOpen(state, action) {
      state.isOpen = true;
    },
    onClose(state, action) {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = isModalOpenSlice.actions;
export default isModalOpenSlice.reducer;
