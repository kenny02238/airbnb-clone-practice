import { combineReducers } from "@reduxjs/toolkit";
import isRegisterModalOpenSlice from "../features/isRegisterModalOpen/isRegisterModalOpenSlice";
import isLoginModalOpenSlice from "../features/isLoginModalOpen/isLoginModalOpenSlice";
import isUploadToAirbnbModalOpenSlice from "../features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import userSessionSlice from "../features/userSession/userSessionSlice";
const rootReducer = combineReducers({
  isRegisterModalOpenSlice,
  isLoginModalOpenSlice,
  isUploadToAirbnbModalOpenSlice,
  userSessionSlice,
});

export default rootReducer;
