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
import { GET_ME } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const [screenWidth] = useWindowSize();
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  const { REGISTER, LOGIN, DASHBOARD, CREATE_READING } = ROUTES;
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log("ERROR = ", error);
  }

  return (
    <Stack sx={{ height: "100vh", minHeight: "100vh", margin: 0 }}>
      {!isTablet && <Header />}
      <Stack
        sx={{
          height: isTablet ? "calc(100vh - 115px)" : "calc(100vh - 72px)",
          overflowY: "auto",
        }}
      >
        <Stack
          sx={{
            maxWidth: "1300px",
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
              <Route
                element={<Dashboard userInfo={data?.me} />}
                path={DASHBOARD}
              />
              <Route element={<CreatingReading />} path={CREATE_READING} />
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
      {isTablet && <Footer userInfo={data?.me} />}
    </Stack>
  );
};

export default App;
