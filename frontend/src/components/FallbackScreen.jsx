import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const FallBackScreen = ({
  title,
  subtitle,
  showCta,
  ctaLink,
  ctaText,
  svgComponent,
}) => {
  return (
    <Stack>
      <Stack sx={{ textAlign: "center", mb: 2 }}>
        <Typography fontSize={22} fontWeight={500}>
          {title}
        </Typography>
        {subtitle && (
          <Typography fontSize={18} fontWeight={400}>
            {subtitle}
          </Typography>
        )}
        {showCta && ctaLink && (
          <Link to={ctaLink}>
            <Button style={{ marginTop: "2.5rem" }}>{ctaText}</Button>
          </Link>
        )}
      </Stack>
      {svgComponent}
    </Stack>
  );
};

export default FallBackScreen;
