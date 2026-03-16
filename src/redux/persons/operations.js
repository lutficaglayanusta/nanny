import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPersons = createAsyncThunk("", async (_, thunkAPI) => {
  try {
    const res = await axios.get(
      "https://nannies-cbc6e-default-rtdb.firebaseio.com/.json"
    );

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
