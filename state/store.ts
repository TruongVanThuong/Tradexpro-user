import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer/user";
import { exchangeSlice } from "./reducer/exchange";
import { demoExchangeSlice } from "./reducer/demoExchange";
import { futureExchangeSlice } from "./reducer/futureExchange";
import { commonSlice } from "./reducer/common";
import reportsReducer from './reportsSlice';
export const store = configureStore({
  reducer: {
    reports: reportsReducer,
    user: userSlice.reducer,
    exchange: exchangeSlice.reducer,
    demoExchange: demoExchangeSlice.reducer,
    futureExchange: futureExchangeSlice.reducer,
    common: commonSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
