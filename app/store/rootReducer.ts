import { combineReducers } from "@reduxjs/toolkit";

import portfolioSlice from "./portfolio.slice";
import searchSlice from "./search.slice";

const rootReducer = combineReducers({
  search: searchSlice,
  portfolio: portfolioSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
