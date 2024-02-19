import React, { useContext } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ROUTES } from "../constants";
import client from "../apolloClient";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogOut = () => {
    logOut();
    client.clearStore();
    navigate(ROUTES.LOGIN);
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        px: 2,
        py: 2,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
        position: "sticky",
      }}
    >
      <Link to={"/"}>
        <Typography fontSize={20} fontWeight={600}>
          Gluco Noter
        </Typography>
      </Link>
      {user?.userId && (
        <Stack direction={"row"} gap={2}>
          {pathname !== ROUTES.CREATE_READING && (
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.CREATE_READING)}
            >
              Add Reading
            </Button>
          )}
          <Button variant="outlined" onClick={onLogOut}>
            Logout
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
