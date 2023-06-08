import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface appState {
  data: {};
  URLs: {
    numOfKublets?: string;
    numOfPods?: string;
    numOfContainers?: string;
    cpuUsage?: string;
    memUsageGraph?: string;
    memUsageDial?: string;
    availability?: string;
    errorBudget?: string;
  };
}

const initialState: appState = {
  data: {},
  URLs: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Object>) => {
      state.data = action.payload;
    },
    setURLs: (state, action: PayloadAction<Object>) => {
      state.URLs = action.payload;
    },
  },
});

export const { setData, setURLs } = appSlice.actions;

export default appSlice.reducer;
