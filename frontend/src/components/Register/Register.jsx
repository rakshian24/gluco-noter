import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { InitialRegisterFormValues } from "./helpers";
import { emailRegex, textInputRegex } from "../../utils";
import CustomInput from "../CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { AuthContext } from "../../context/authContext";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../graphql/mutations";

const Register = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...InitialRegisterFormValues },
    mode: "onChange",
  });

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };

  useEffect(() => {
    if (user?.userId) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate, user?.userId]);

  const onSubmitHandler = async (formValues) => {
    const { data } = await registerUser({
      variables: {
        registerInput: { ...formValues },
      },
    });
    if (data?.registerUser?.token) {
      login(data?.registerUser);
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <Stack gap={2}>
      <Typography fontSize={24} fontWeight={600}>
        Create an account
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack>
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack gap={2}>
            <Controller
              name="username"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: textInputRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter username"
                  label="Username"
                />
              )}
            />

            <Controller
              name="email"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: emailRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter email"
                  label="Email"
                />
              )}
            />

            <Controller
              name="password"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: textInputRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter password"
                  label="Password"
                  type="password"
                />
              )}
            />

            <Controller
              name="confirmPassword"
              {...COMMON_PROPS}
              rules={{
                required: true,
                pattern: {
                  value: textInputRegex,
                  message: "Invalid characters",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  error={error !== undefined}
                  styles={{ width: "100%" }}
                  placeholder="Enter confirm password"
                  label="Confirm password"
                  type="password"
                />
              )}
            />

            <Stack
              display={"flex"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={1}
            >
              <Typography>
                Already have an account?
                <Link
                  to={ROUTES.LOGIN}
                  style={{
                    marginLeft: "4px",
                    fontWeight: 500,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
              <Button
                onClick={() => onSubmitHandler}
                variant="contained"
                type="submit"
                sx={{ width: "120px" }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
