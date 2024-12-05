import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store.ts';
import { decodeText, encodeText } from './passwordThunks.ts';

interface passwordState {
  password: string;
  decodedText: string;
  encodedText: string;
  isLoading: boolean;
}

const initialState: passwordState = {
  password: '',
  decodedText: '',
  encodedText: '',
  isLoading: false,
};

export const selectPassword = (state: RootState) => state.password.password;
export const selectDecodedText = (state: RootState) => state.password.decodedText;
export const selectEncodedText = (state: RootState) => state.password.encodedText;
export const selectLoading = (state: RootState) => state.password.isLoading;



const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(encodeText.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.encodedText = payload;
      })
      .addCase(encodeText.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(decodeText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decodeText.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.decodedText = payload;
      })
      .addCase(decodeText.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export const passwordReducer = passwordSlice.reducer;
