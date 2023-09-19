import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isOpen: boolean;
  listingId: string | undefined;
}

const initialState = {
  isOpen: false,
  listingId: undefined,
};

const isWishListOpenSlice = createSlice({
  name: "isWishListOpenSlice",
  initialState,
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
    setListingId(state, action) {
      state.listingId = action.payload;
    },
  },
});

export const { onOpen, onClose, setListingId } = isWishListOpenSlice.actions;
export default isWishListOpenSlice.reducer;
