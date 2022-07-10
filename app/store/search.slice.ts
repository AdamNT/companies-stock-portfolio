import { Company } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  value: string;
  results: Company[];
}

const initialState = {
  value: "",
  results: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.value = payload;
    },
    setSearchResults: (state, { payload }: PayloadAction<[]>) => {
      state.results = payload;
    },
    clearSearchValue: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue, clearSearchValue, setSearchResults } =
  searchSlice.actions;

export default searchSlice.reducer;
