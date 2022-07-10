import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomAppBar from "@components/CustomAppBar";
import { isEmpty } from "lodash";

interface CompanyPageProps {
  company:
    | {
        Name: string;
        Address: string;
        MarketCapitalization: string;
        Description: string;
      }
    | {};
}

const CompanyPage: NextPage<CompanyPageProps> = ({ company }) => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  if (company?.["Error Message"] || isEmpty(company?.Name)) {
    return (
      <Fragment>
        <Head>
          <title>Company API Error</title>
        </Head>
        <CustomAppBar />
        <Container>
          <Box component="main" sx={{ pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<KeyboardBackspaceIcon />}
                  onClick={handleGoBack}
                >
                  Go Back
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  {isEmpty(company?.Name)
                    ? "Api did not return any data"
                    : company?.["Error Message"]}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{company.Name}</title>
      </Head>
      <CustomAppBar />
      <Container>
        <Box component="main" sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4" component="h1">
                {company.Name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Address:</b> {company.Address}
              </Typography>
              <Typography>
                <b>Market Capitalization:</b> {company.MarketCapitalization}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{company.Description}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
};

export default CompanyPage;
