import type { NextPage } from "next";
import Head from "next/head";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCompany, removeCompanyBySymbol } from "@store/portfolio.slice";
import { Box, Container, Grid } from "@mui/material";
import { ENDPOINT } from "@constants/endpoint";
import { setSearchResults, setSearchValue } from "@store/search.slice";
import ApiService from "@services/Api.service";
import axios from "@utils/axiosInstance";
import Portfolio from "@components/Portfolio";
import SearchResultList from "@components/SearchResultList";
import CustomAppBar from "@components/CustomAppBar";
import { Company } from "app/interfaces";
import SearchInput from "@components/SearchInput";
import { useMemo } from "react";
import throttle from "lodash/throttle";

const HomePage: NextPage = () => {
  const dispatch = useDispatch();
  const { value: searchValue, results: searchResults } = useSelector(
    ({ search }) => search
  );
  const portfolioCompanies = useSelector(
    ({ portfolio }) => portfolio.companies
  );

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
  };

  const getSearchResults = useMemo(
    () =>
      throttle(async (value: string) => {
        const response = await axios.get(ENDPOINT.QUERY, {
          params: { function: "SYMBOL_SEARCH", keywords: value },
        });

        const options = ApiService.removeNumberFromObjectKeysArray(
          response?.data?.bestMatches ?? []
        );

        dispatch(setSearchResults(options));
      }, 500),
    []
  );

  useEffect(() => {
    getSearchResults(searchValue);
  }, [searchValue]);

  const handleAddCompany = (company: Company) => dispatch(addCompany(company));
  const handleRemoveCompany = (symbol: string) =>
    dispatch(removeCompanyBySymbol(symbol));

  return (
    <Fragment>
      <Head>
        <title>Companies stock portfolio</title>
      </Head>
      <CustomAppBar />

      <Container>
        <Box component="main" sx={{ pt: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SearchInput
                id="search-input"
                label="Company name"
                placeholder="Example: Apple"
                value={searchValue}
                onChange={handleChangeSearchValue}
              />
              <div style={{ marginBottom: "20px" }} />

              <SearchResultList
                label="Search results:"
                results={searchResults}
                onClickAdd={handleAddCompany}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Portfolio
                label="Your portfolio:"
                items={portfolioCompanies}
                onRemoveItem={handleRemoveCompany}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};

export default HomePage;
