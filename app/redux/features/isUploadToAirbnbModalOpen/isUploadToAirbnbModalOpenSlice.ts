import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isOpen: boolean;
}

const initialState = {
  isOpen: false,
};

const isUploadToAirbnbModalOpenSlice = createSlice({
  name: "isUploadToAirbnbModalOpenSlice",
  initialState,
  reducers: {
    onOpenUpload(state) {
      state.isOpen = true;
    },
    onCloseUpload(state) {
      state.isOpen = false;
    },
  },
});

export const { onOpenUpload, onCloseUpload } =
  isUploadToAirbnbModalOpenSlice.actions;
export default isUploadToAirbnbModalOpenSlice.reducer;
