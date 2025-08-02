// Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice"; // if you're using it

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage by default

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer, // optional
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
