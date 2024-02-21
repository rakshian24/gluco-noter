import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/authContext";
import { ROUTES, colors } from "../../constants";
import { getInitials } from "../../utils";
import client from "../../apolloClient";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    client.clearStore();
    logoutUser();
    navigate(ROUTES.LOGIN);
  };

  return (
    <Stack display={"flex"} alignItems={"center"} mt={1}>
      <Avatar
        sx={{
          width: "60px",
          height: "60px",
          fontSize: "22px",
          fontWeight: 500,
          backgroundColor: colors.primaryBlue,
          marginBottom: 2,
        }}
      >
        {getInitials(user?.username)}
      </Avatar>
      <Typography fontSize={22} fontWeight={500}>
        {user?.username}
      </Typography>
      <Typography fontSize={16} fontWeight={300} mt={0.5}>
        {user?.email}
      </Typography>
      <Button
        variant="contained"
        sx={{
          fontSize: 15,
          width: "100%",
          my: 2,
        }}
        onClick={onLogOut}
      >
        Log out
      </Button>
    </Stack>
  );
};

export default Profile;
