import React from "react";
import { Stack, Typography } from "@mui/material";

const Dashboard = ({ userInfo }) => {
  return (
    <Stack>
      <Typography fontSize={16} fontWeight={500}>
        Hi! {userInfo?.username}
      </Typography>
    </Stack>
  );
};

export default Dashboard;
