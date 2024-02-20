import { Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { ListContainer, StyledLegend } from "./styles";
import { readingTypeKeyVsDescMap } from "../utils";

const ReadingDetailsCard = ({ readingObj }) => {
  const { type, reading, consumedFoods } = readingObj;
  return (
    <Grid item xs={12} md={6}>
      <ListContainer>
        <StyledLegend>{readingTypeKeyVsDescMap[type]}</StyledLegend>
        <Stack gap={2}>
          <Typography>{reading} mg/dL</Typography>
          <Stack gap={2} direction={"row"}>
            {consumedFoods.map((food) => {
              return <Chip key={food._id} label={food.value} />;
            })}
          </Stack>
        </Stack>
      </ListContainer>
    </Grid>
  );
};

export default ReadingDetailsCard;
