import { Company } from "@interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCompany: (state, { payload }: PayloadAction<Company | {}>) => {
      if (state.companies.every(({ symbol }) => symbol !== payload.symbol)) {
        state.companies.push(payload);
      }
    },
    removeCompanyBySymbol: (state, { payload }: PayloadAction<string>) => {
      const filteredCompanies = state.companies.filter(
        ({ symbol }) => symbol !== payload
      );
      state.companies = filteredCompanies;
    },
    clearAllCompanies: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCompany, removeCompanyBySymbol, clearAllCompanies } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
