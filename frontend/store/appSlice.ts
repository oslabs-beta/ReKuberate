import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface appState {
  exampleState: string,
  anotherState: any[]
}

const initialState: appState = {
  exampleState: 'Goodbye',
  anotherState: []
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setExampleState: (state, action: PayloadAction<string>) => {
      state.exampleState = action.payload;
    },
    setAnotherState: (state, action: PayloadAction<any>) => {
      state.anotherState = [...state.anotherState, action.payload]
    }
  },
});

export const { setExampleState, setAnotherState } = appSlice.actions;

export default appSlice.reducer;