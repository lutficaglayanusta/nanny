import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
      removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload.name);
      localStorage.setItem("favorites", JSON.stringify(state.items));
      },
      fetchFavorite: (state) => {
          state.items
      }
  },
});
export const { addFavorite, removeFavorite,fetchFavorite } = favoriteSlice.actions;

const favoritesReducer = favoriteSlice.reducer;

export default favoritesReducer;
