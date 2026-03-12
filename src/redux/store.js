import { configureStore } from "@reduxjs/toolkit";
import personProducer from "./persons/slice";

export const store = configureStore({
  reducer: {
    person: personProducer,
  },
});
