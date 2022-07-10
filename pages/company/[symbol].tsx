import CompanyPage from "@views/CompanyPage";
import axios from "@utils/axiosInstance";
import { ENDPOINT } from "@constants/endpoint";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const symbol = context?.params?.symbol;

  try {
    const response = await axios.get(ENDPOINT.QUERY, {
      params: { function: "OVERVIEW", symbol },
    });

    return { props: { company: response?.data ?? {} } };
  } catch (error) {
    return { notFound: true };
  }
};

export default CompanyPage;
