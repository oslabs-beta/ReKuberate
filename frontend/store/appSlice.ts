import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface appState {
  data: {};
}

const initialState: appState = {
  data: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Object>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = appSlice.actions;

export default appSlice.reducer;
