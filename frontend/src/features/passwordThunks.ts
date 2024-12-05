import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';

export const encodeText = createAsyncThunk(
  'passwordApp/encodeText',
  async ({password, message} : {password: string, message: string}) => {
    try {
      const response = await axiosApi.post('/encode', {password, message});
      return response.data.encoded;
    } catch (error) {
      throw new Error ('Failed');
    }
  }
);

export const decodeText = createAsyncThunk(
  'app/decodeText',
  async ({ password, message }: { password: string, message: string }) => {
    try {
      const response = await axiosApi.post('/decode', { password, message });
      return response.data.decoded;
    } catch (error) {
      throw new Error('Failed to decode');
    }
  }
);