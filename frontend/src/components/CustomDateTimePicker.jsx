import { Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { colors } from "../constants";

const CustomDateTimePicker = ({
  styles,
  inputStyles,
  placeholder,
  dataTestId,
  label,
  error,
  ...props
}) => (
  <Stack
    sx={{
      ...(styles && { ...styles }),
    }}
    gap={"4px"}
  >
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        {...props}
        slotProps={{
          textField: {
            sx: {
              input: {
                "&::placeholder": {
                  color: colors.contentTertiary,
                  padding: 0,
                  opacity: 1,
                },
              },
            },
            inputProps: {
              style: {
                padding: "0.75rem 1rem",
                borderRadius: "24px 0 0 24px",
              },
            },
            InputProps: {
              ...(placeholder && { placeholder: placeholder }),
              sx: {
                fontSize: "1rem",
                padding: 0,
                pr: 2.5,
                borderRadius: 1.5,
                ...(error && { color: colors.red }),
                backgroundColor: error ? colors.lightRed : colors.white,
                ...(inputStyles && { ...inputStyles }),
              },
            },
          },
        }}
      />
    </LocalizationProvider>
    <Typography
      sx={{
        px: 1,
        color: error ? colors.red : colors.contentSecondary,
        fontSize: "12px",
      }}
    >
      {label}
    </Typography>
  </Stack>
);

export default CustomDateTimePicker;
