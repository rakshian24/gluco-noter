import { Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { ListContainer, StyledLegend } from "./styles";
import {
  capitalizeFirstLetter,
  isFiaspInsulin,
  readingTypeKeyVsDescMap,
  showInsulinUnitsField,
  isHumInsulinN,
  getFormattedTimeStamp,
} from "../utils";

const ReadingDetailsCard = ({ readingObj }) => {
  const { type, reading, consumedFoods, description, insulinUnits, createdAt } =
    readingObj;

  const showInsulinUnitsDetails =
    showInsulinUnitsField(type) && insulinUnits > 0;

  const isFiasp = isFiaspInsulin(type);
  const isHum = isHumInsulinN(type);

  const insulinDetails = isFiasp
    ? `Fiasp insulin`
    : isHum
    ? `HumInsulin N`
    : ``;

  const readingTime = getFormattedTimeStamp(createdAt);

  return (
    <Grid item xs={12} md={6}>
      <ListContainer>
        <StyledLegend>
          {capitalizeFirstLetter(readingTypeKeyVsDescMap[type])}
        </StyledLegend>
        <Stack gap={2}>
          <Typography>{reading} mg/dL</Typography>
          {consumedFoods.length > 0 && (
            <Stack gap={2} direction={"row"}>
              {consumedFoods.map((food) => {
                return <Chip key={food._id} label={food.value} />;
              })}
            </Stack>
          )}
          <Typography>
            {showInsulinUnitsDetails
              ? `${description} I took ${insulinUnits} units of ${insulinDetails} at ${readingTime}.`
              : `${description} I took the reading at ${readingTime}`}
          </Typography>
        </Stack>
      </ListContainer>
    </Grid>
  );
};

export default ReadingDetailsCard;
