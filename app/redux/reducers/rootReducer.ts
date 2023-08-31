import { combineReducers } from "@reduxjs/toolkit";
import isRegisterModalOpenSlice from "../features/isRegisterModalOpen/isRegisterModalOpenSlice";
import isLoginModalOpenSlice from "../features/isLoginModalOpen/isLoginModalOpenSlice";
import isUploadToAirbnbModalOpenSlice from "../features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
const rootReducer = combineReducers({
  isRegisterModalOpenSlice,
  isLoginModalOpenSlice,
  isUploadToAirbnbModalOpenSlice,
});

export default rootReducer;
