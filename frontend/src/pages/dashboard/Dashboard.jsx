import React from "react";

import { Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../graphql/queries";

const Dashboard = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    console.log("ERROR = ", error);
  }

  return (
    <Stack>
      <Typography fontSize={16} fontWeight={500}>
        Hi! {data?.me?.username}
      </Typography>
    </Stack>
  );
};

export default Dashboard;
