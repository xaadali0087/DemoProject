import { combineReducers, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import {
  Action,
  configureStore,
  ThunkAction,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";

// ** Reducers
import userSlice from "./reducers/userSlice";
import productSlice from "./reducers/productSlice";
import cartSlice from "./reducers/cartSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "cart"],
  blacklist: [],
  transforms: [],
};

const reducers = combineReducers({
  user: userSlice,
  product: productSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
}).concat(ReduxThunk);

let enhancedCompose = compose;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
