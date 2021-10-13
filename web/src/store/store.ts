import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from './reducers/user.slice';

const config = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(config, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
