import { Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { ListContainer, StyledLegend } from "./styles";
import { capitalizeFirstLetter, readingTypeKeyVsDescMap } from "../utils";

const ReadingDetailsCard = ({ readingObj }) => {
  const { type, reading, consumedFoods, description } = readingObj;
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
          <Typography>{description}</Typography>
        </Stack>
      </ListContainer>
    </Grid>
  );
};

export default ReadingDetailsCard;
