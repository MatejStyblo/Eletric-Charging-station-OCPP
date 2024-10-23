// actions.js
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const SET_ACTUAL_PRICE = 'SET_ACTUAL_PRICE';
export const SET_NEXT_HOUR_PRICE = 'SET_NEXT_HOUR_PRICE';
export const TOGGLE_CHARGING = 'TOGGLE_CHARGING';
export const SET_CHARGING_RESULT = 'SET_CHARGING_RESULT';
export const SET_TOTAL_COST = 'SET_TOTAL_COST';
export const SET_FETCH_ERROR = 'SET_FETCH_ERROR';
export const SET_ELECTRIC_DATA = 'SET_ELECTRIC_DATA'
export const SET_INPUT_VALUE= 'SET_INPUT_VALUE'
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const setActualPrice = (price) => ({
  type: SET_ACTUAL_PRICE,
  payload: price,
});

export const setNextHourPrice = (price) => ({
  type: SET_NEXT_HOUR_PRICE,
  payload: price,
});

export const toggleCharging = (isCharging) => ({
    type: TOGGLE_CHARGING,
    payload: isCharging
});

export const setChargingResult = (result) => ({
  type: SET_CHARGING_RESULT,
  payload: result,
});

export const setTotalCost = (cost) => ({
  type: SET_TOTAL_COST,
  payload: cost,
});

export const setFetchError = (error) => ({
  type: SET_FETCH_ERROR,
  payload: error,
});
export const setEletricData = (data) => ({
  type: SET_ELECTRIC_DATA,
  payload: data,
});
export const setInputValue = (value) => ({
  type: SET_INPUT_VALUE,
  payload: value,
});