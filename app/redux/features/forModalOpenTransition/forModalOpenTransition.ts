import { createSlice } from "@reduxjs/toolkit";

interface forModalOpenTransitionState {
  isOpenForTransition: boolean;
}

const initialState: forModalOpenTransitionState = {
  isOpenForTransition: true,
};

const forModalOpenTransitionSlice = createSlice({
  name: "forModalOpenTransitionSlice",
  initialState,
  reducers: {
    onTransition(state, action) {
      state.isOpenForTransition = action.payload;
    },
  },
});

export const { onTransition } = forModalOpenTransitionSlice.actions;
export default forModalOpenTransitionSlice.reducer;
