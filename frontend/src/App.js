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
import CreatingReading from "./pages/createReading/CreatingReading";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./context/authContext";
import ReadingDetails from "./pages/readings/details/ReadingDetails";
import Profile from "./pages/profile";

const App = () => {
  const { user } = useAuth();
  const [screenWidth] = useWindowSize();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);
  const isPcAndAbove = useMediaQuery(`(min-width:${screenSize.pc})`);

  const {
    REGISTER,
    LOGIN,
    DASHBOARD,
    CREATE_READING,
    READING_DETAILS,
    PROFILE,
  } = ROUTES;

  return (
    <Stack sx={{ height: "100vh", minHeight: "100vh", margin: 0 }}>
      {!isTablet && <Header />}
      <Stack
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Stack
          sx={{
            maxWidth: "1300px",
            ...(isPcAndAbove && { width: "100%" }),
            margin: isTablet ? "0" : "0 auto",
            padding: isMobile ? 2 : 3,
          }}
        >
          <Routes>
            <Route path={REGISTER} element={<Home />}>
              <Route element={<Register />} index />
              <Route element={<Login />} path={LOGIN} />
            </Route>
            {/* Protected routes */}
            <Route path="" element={<ProtectedRoute />}>
              <Route element={<Dashboard userInfo={user} />} path={DASHBOARD} />
              <Route
                element={<CreatingReading userInfo={user} />}
                path={CREATE_READING}
              />
              <Route element={<ReadingDetails />} path={READING_DETAILS} />
              {isTablet && <Route element={<Profile />} path={PROFILE} />}
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
      {isTablet && user?.userId && <Footer userInfo={user} />}
    </Stack>
  );
};

export default App;
