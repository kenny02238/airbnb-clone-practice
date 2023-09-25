import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isOpen: boolean;
}

const initialState = {
  isOpen: false,
};

const isSearchModalOpenSlice = createSlice({
  name: "isSearchModalOpenSlice",
  initialState,
  reducers: {
    onOpenSearch(state) {
      state.isOpen = true;
    },
    onCloseSearch(state) {
      state.isOpen = false;
    },
  },
});

export const { onOpenSearch, onCloseSearch } = isSearchModalOpenSlice.actions;
export default isSearchModalOpenSlice.reducer;
