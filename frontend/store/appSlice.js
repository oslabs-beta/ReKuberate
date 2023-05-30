import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    exampleState: 'Goodbye',
    anotherState: []
  },

  reducers: {
    setExampleState: (state, action) => {
      state.exampleState = action.payload;
    },
    setAnotherState: (state, action) => {
      state.anotherState = [...state.anotherState, action.payload]
    }
  },
});

export const { setExampleState, setAnotherState } = appSlice.actions;

export default appSlice.reducer;