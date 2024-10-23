// store.js
import { configureStore } from '@reduxjs/toolkit';
import chargingReducer from './chargingReducer'; // Your reducer

const store = configureStore({
  reducer: {
    charging: chargingReducer,
  },
});

export default store;
