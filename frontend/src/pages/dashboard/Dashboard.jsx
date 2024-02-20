import React from "react";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { screenSize } from "../../constants";
import { useQuery } from "@apollo/client";
import { GET_ALL_READINGS } from "../../graphql/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReadingList from "../../components/ReadingList";

const Dashboard = ({ userInfo }) => {
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);
  const { data, loading } = useQuery(GET_ALL_READINGS);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack>
      <Typography fontSize={isMobile ? 16 : 18} fontWeight={500} mb={3}>
        Hi, {userInfo?.username}
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <ReadingList readings={data?.getAllReadingsGroupedByDate} />
      </Grid>
    </Stack>
  );
};

export default Dashboard;
