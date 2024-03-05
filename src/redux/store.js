import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./slices/userSlice";
import signUpUserSlice from "./slices/signUpUserSlice";
import loadingReducer from "./slices/loadingSlice";
import homePageReducer from "./slices/homePageSlice";
import videoReducer from "./slices/videoSlice";
import teachersReducer from "./slices/teachersSlice";
import groundWorkVideosReducer from "./slices/groundWorkVideos";
import groundWorkCategoriesReducer from "./slices/groundWorkCategories";
import toolVideosReducer from "./slices/toolVideos";
import toolCategoryReducer from "./slices/toolCategories";
import selectPackageReducer from "./slices/selectPackage";
import scheduleVGReducer from "./slices/scheduleVibeGuide";

const rootReducer = combineReducers({
  user: userReducer,
  signUpUser: signUpUserSlice,
  loading: loadingReducer,
  homepage: homePageReducer,
  video: videoReducer,
  teachers: teachersReducer,
  groundWorkVideos: groundWorkVideosReducer,
  groundWorkCategories: groundWorkCategoriesReducer,
  toolVideos: toolVideosReducer,
  toolCategories: toolCategoryReducer,
  selectPackage: selectPackageReducer,
  schedulVG: scheduleVGReducer,
});
const persistConfig = {
  key: "root",
  storage,
  blackList: ["loading"],
  // whitelist: ["user", "signUpUser"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
