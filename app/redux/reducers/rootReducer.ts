import { combineReducers } from "@reduxjs/toolkit";
import isModalOpenSlice from "../features/isModalOpen/isModalOpenSlice";

const rootReducer = combineReducers({
  isModalOpen: isModalOpenSlice,
});

export default rootReducer;
