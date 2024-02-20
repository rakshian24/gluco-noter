import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

import { ListContainer, StyledLegend } from "./styles";
import { getFormattedDate, getReadingsObjectByType } from "../utils";

const Header = ({ headerText }) => {
  return (
    <Typography fontSize={16} mr={1}>
      {headerText} :
    </Typography>
  );
};

const Value = ({ value }) => {
  return <Typography fontSize={16}>{value}</Typography>;
};

const Cell = ({ children }) => {
  return (
    <Stack
      direction={"row"}
      alignContent={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Stack>
  );
};

const Row = ({ children }) => {
  return (
    <Stack
      gap={2}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {children}
    </Stack>
  );
};

const ReadingListItem = ({ reading }) => {
  const date = getFormattedDate(reading._id);
  const dayReadingsArr = reading.results;
  const readingsObjByType = getReadingsObjectByType(dayReadingsArr);

  const getReadingVal = (readingType) => {
    return readingsObjByType?.[readingType]?.reading || "-";
  };

  const handleOnReadingCardClick = () => {
    // navigate(`/reading/${reading._id}`);
  };

  return (
    <Grid item xs={12} md={6}>
      <ListContainer onClick={handleOnReadingCardClick}>
        <StyledLegend>{date}</StyledLegend>
        <Stack gap={2}>
          <Row>
            <Cell>
              <Header headerText="Bfr breakfast" />
              <Value value={getReadingVal("BB")} />
            </Cell>
            <Cell>
              <Header headerText="Aft breakfast" />
              <Value value={getReadingVal("AB")} />
            </Cell>
          </Row>

          <Row>
            <Cell>
              <Header headerText="Bfr lunch" />
              <Value value={getReadingVal("BL")} />
            </Cell>
            <Cell>
              <Header headerText="Aft lunch" />
              <Value value={getReadingVal("AL")} />
            </Cell>
          </Row>

          <Row>
            <Cell>
              <Header headerText="Bfr dinner" />
              <Value value={getReadingVal("BD")} />
            </Cell>
            <Cell>
              <Header headerText="Aft dinner" />
              <Value value={getReadingVal("AD")} />
            </Cell>
          </Row>
        </Stack>
      </ListContainer>
    </Grid>
  );
};

export default ReadingListItem;
