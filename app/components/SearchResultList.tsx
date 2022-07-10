import { Fragment } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { Company } from "@interfaces";
import Link from "@components/Link";
import { useSelector } from "react-redux";

interface SearchResultListInterface {
  label: string;
  results: Company[];
  onClickAdd: Function;
}

const SearchResultList = ({
  label = "",
  results = [],
  onClickAdd = () => {},
}: SearchResultListInterface) => {
  const portfolioCompanies = useSelector(state => state.portfolio.companies);
  const checkItemExistInPortfolio = (symbol: string): Boolean =>
    portfolioCompanies.some(item => item.symbol === symbol);

  return (
    <Fragment>
      <Typography mb={1}>{label}</Typography>
      {results.length === 0 && (
        <Typography>
          No search results, enter something in the search field
        </Typography>
      )}

      {results.map(result => {
        const { symbol, name } = result;
        const isInPortfolio = checkItemExistInPortfolio(symbol);

        return (
          <Grid
            key={uuidv4()}
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Link href={`/company/${symbol}`} underline="none">
                {`${symbol} - ${name}`}
              </Link>
            </Grid>
            <Grid item xs="auto">
              <IconButton
                aria-label="add"
                size="small"
                color={isInPortfolio ? "warning" : "success"}
                onClick={() => onClickAdd(result)}
              >
                {isInPortfolio ? <CheckBoxIcon /> : <AddBoxIcon />}
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default SearchResultList;
