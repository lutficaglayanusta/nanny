import { configureStore } from "@reduxjs/toolkit";
import personProducer from "./persons/slice";
import favoritesReducer from "./favorites/slice";

export const store = configureStore({
  reducer: {
    person: personProducer,
    favorite:favoritesReducer
  },
});
