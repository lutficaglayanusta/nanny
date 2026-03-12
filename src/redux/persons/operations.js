import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllPersons = createAsyncThunk("", async (_,thunkAPI) => {
    try {
        const res = axios.get("")

        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

