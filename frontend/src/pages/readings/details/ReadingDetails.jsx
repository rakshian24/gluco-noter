import React from "react";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { getFormattedDate, getSvgWidth } from "../../../utils";
import { ROUTES, screenSize } from "../../../constants";
import { useQuery } from "@apollo/client";
import { GET_READINGS_FOR_DATE } from "../../../graphql/queries";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useWindowSize } from "../../../hooks/useWindowResize";
import FallBackScreen from "../../../components/FallbackScreen";
import NoDataFoundSvgComponent from "../../../components/NoDataFoundSvgComponent";
import ReadingDetailsCard from "../../../components/ReadingDetailsCard";

const ReadingDetails = () => {
  const { date } = useParams();
  const [screenWidth] = useWindowSize();
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const { data, loading } = useQuery(GET_READINGS_FOR_DATE, {
    variables: {
      date,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Stack>
      <Typography fontSize={isMobile ? 16 : 18} fontWeight={500} mb={3}>
        Readings for {getFormattedDate(date)}
      </Typography>
      {data?.getAllReadingForDate?.length > 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.getAllReadingForDate.map((reading) => {
            return (
              <ReadingDetailsCard key={reading._id} readingObj={reading} />
            );
          })}
        </Grid>
      ) : (
        <FallBackScreen
          title={"No data found for this date."}
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

export default ReadingDetails;
