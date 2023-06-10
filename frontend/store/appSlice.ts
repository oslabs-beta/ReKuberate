import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  loading: 'block' | 'none';
  podIntervalID: any;
}

const initialState: appState = {
  data: {},
  URLs: {},
  loading: 'none',
  podIntervalID: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Object>) => {
      state.data = action.payload;
    },
    setURLs: (state, action: PayloadAction<Object>) => {
      state.URLs = action.payload;
    },
    setLoading: (state, action: PayloadAction<'block' | 'none'>) => {
      state.loading = action.payload;
    },
    setPodIntervalID: (state, action: PayloadAction<any>) => {
      state.podIntervalID = action.payload;
    },
  },
});

export const { setData, setURLs, setLoading, setPodIntervalID } = appSlice.actions;

export default appSlice.reducer;
