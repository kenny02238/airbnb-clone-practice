import { combineReducers } from "@reduxjs/toolkit";
import isRegisterModalOpenSlice from "../features/isRegisterModalOpen/isRegisterModalOpenSlice";
import isLoginModalOpenSlice from "../features/isLoginModalOpen/isLoginModalOpenSlice";
import isUploadToAirbnbModalOpenSlice from "../features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import userSessionSlice from "../features/userSession/userSessionSlice";
import forModalOpenTransition from "../features/forModalOpenTransition/forModalOpenTransition";
import isWishListOpenSlice from "../features/isWishListOpen/isWishListOpenSlice";
const rootReducer = combineReducers({
  isRegisterModalOpenSlice,
  isLoginModalOpenSlice,
  isUploadToAirbnbModalOpenSlice,
  forModalOpenTransition,
  userSessionSlice,
  isWishListOpenSlice,
});

export default rootReducer;
