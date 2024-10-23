import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  actualPrice: "",
  nextHourPrice: "",
  charging: false,
  chargingResult: null,
  totalCost: "N/A",
  fetchError: null,
  electricData:null
};

const chargingSlice = createSlice({
  name: 'charging',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.data = action.payload;
    },
    setActualPrice: (state, action) => {
      state.actualPrice = action.payload;
    },
    setNextHourPrice: (state, action) => {
      state.nextHourPrice = action.payload;
    },
    toggleCharging: (state) => {
      state.charging = !state.charging;
    },
    setChargingResult: (state, action) => {
      state.chargingResult = action.payload;
    },
    setTotalCost: (state, action) => {
      state.totalCost = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setElectricData: (state, action) => {
      state.electricData = action.payload;
    },
  },
});

// Exporting the actions
export const {
  fetchDataSuccess,
  setActualPrice,
  setNextHourPrice,
  toggleCharging,
  setChargingResult,
  setTotalCost,
  setFetchError,
  setElectricData
} = chargingSlice.actions;

// Exporting the reducer
export default chargingSlice.reducer;
