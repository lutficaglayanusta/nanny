import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPersons } from "./operations";

const personSlice = createSlice({
  name: "person",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPersons.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

const personProducer = personSlice.reducer;

export default personProducer;
