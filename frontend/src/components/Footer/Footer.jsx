import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiDatabase2Fill,
} from "react-icons/ri";
import { ROUTES, colors } from "../../constants";
import { Avatar, Stack } from "@mui/material";
import { getInitials, isStandAloneAndRunningOnIos16 } from "../../utils";

const { DASHBOARD, CREATE_READING, REPORT, PROFILE } = ROUTES;

const Footer = ({ userInfo }) => {
  const { pathname } = useLocation();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        pb: isStandAloneAndRunningOnIos16() ? "35px" : "10px",
        px: "20px",
        pt: "10px",
        borderTop: `1px solid ${colors.lightGrey}`,
      }}
    >
      <NavLink to={DASHBOARD}>
        <RiDashboardFill
          size={30}
          color={pathname === DASHBOARD ? colors.primaryBlue : "#D7D8D9"}
        />
      </NavLink>
      <NavLink to={CREATE_READING}>
        <RiAddCircleFill
          size={35}
          color={pathname === CREATE_READING ? colors.primaryBlue : "#D7D8D9"}
        />
      </NavLink>
      <NavLink to={REPORT}>
        <RiDatabase2Fill
          size={32}
          color={pathname === REPORT ? colors.primaryBlue : "#D7D8D9"}
        />
      </NavLink>
      <NavLink to={PROFILE}>
        <Avatar
          sx={{
            width: "32px",
            height: "32px",
            fontSize: "16px",
            fontWeight: 500,
            backgroundColor:
              pathname === PROFILE ? colors.primaryBlue : "#D7D8D9",
          }}
        >
          {getInitials(userInfo?.username)}
        </Avatar>
      </NavLink>
    </Stack>
  );
};

export default Footer;
