import React from "react";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { ROUTES, screenSize } from "../../constants";
import { useQuery } from "@apollo/client";
import { GET_ALL_READINGS } from "../../graphql/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReadingList from "../../components/ReadingList";
import FallBackScreen from "../../components/FallbackScreen";
import NoDataFoundSvgComponent from "../../components/NoDataFoundSvgComponent";
import { getSvgWidth } from "../../utils";
import { useWindowSize } from "../../hooks/useWindowResize";

const Dashboard = ({ userInfo }) => {
  const [screenWidth] = useWindowSize();
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
      {data.getAllReadingsGroupedByDate.length > 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <ReadingList readings={data?.getAllReadingsGroupedByDate} />
        </Grid>
      ) : (
        <FallBackScreen
          title={"No data found."}
          subtitle={"Please add some readings."}
          showCta={true}
          ctaLink={ROUTES.CREATE_READING}
          ctaText={"Add Reading"}
          svgComponent={
            <NoDataFoundSvgComponent width={getSvgWidth(screenWidth)} />
          }
        />
      )}
    </Stack>
  );
};

export default Dashboard;
