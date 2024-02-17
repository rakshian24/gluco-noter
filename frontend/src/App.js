import { Stack, useMediaQuery } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ROUTES, screenSize } from "./constants";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Register from "./components/Register/Register";
import FallBackScreen from "./components/FallbackScreen";
import PageNotFoundAnimated from "./components/PageNotFoundAnimated";
import { useWindowSize } from "./hooks/useWindowResize";
import { getSvgWidth } from "./utils";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";

const App = () => {
  const [screenWidth] = useWindowSize();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const { REGISTER, LOGIN, DASHBOARD } = ROUTES;
  return (
    <Stack sx={{ height: "100vh", minHeight: "100vh", margin: 0 }}>
      {!isTablet && <Header />}
      <Stack sx={{ height: "calc(100vh - 72px)", overflowY: "auto" }}>
        <Stack
          sx={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: isTablet ? 2 : 3,
          }}
        >
          <Routes>
            <Route path={REGISTER} element={<Home />}>
              <Route element={<Register />} index />
              <Route element={<Login />} path={LOGIN} />
            </Route>

            {/* Protected routes */}
            <Route path="" element={<ProtectedRoute />}>
              <Route element={<Dashboard />} path={DASHBOARD} />
            </Route>

            <Route
              path="*"
              element={
                <FallBackScreen
                  title={"Sorry, page not found!"}
                  showCta={true}
                  ctaLink={ROUTES.DASHBOARD}
                  ctaText={"Go to HomePage"}
                  svgComponent={
                    <PageNotFoundAnimated width={getSvgWidth(screenWidth)} />
                  }
                />
              }
            />
          </Routes>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default App;
