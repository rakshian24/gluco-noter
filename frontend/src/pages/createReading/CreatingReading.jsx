import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { InitialCreateReadingFormValues, glucoseReadingTypes } from "./helpers";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import CustomInput from "../../components/CustomInput";
import { screenSize } from "../../constants";

const CreatingReading = () => {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: { ...InitialCreateReadingFormValues },
    mode: "onChange",
  });

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  return (
    <Stack gap={3} sx={{ minWidth: isTablet ? "100%" : "1000px" }}>
      <Typography fontSize={20} fontWeight={500}>
        Create glucose reading
      </Typography>
      <Stack>
        <form>
          <Stack gap={2}>
            <Stack gap={2} direction={isTablet ? "column" : "row"}>
              <Controller
                name="type"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomSelect
                    {...field}
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Select type"
                    label="Reading type"
                  >
                    {glucoseReadingTypes?.map((type, index) => (
                      <MenuItem key={index} value={type.key}>
                        {type.description}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                )}
              />

              <Controller
                name="reading"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                  pattern: {
                    value: /^(?!0+(?:\0+)?)\d*(?:\d+)?$/,
                    message: "Special characters are not allowed.",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    {...field}
                    type="number"
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Enter reading"
                    label="Reading"
                  />
                )}
              />
            </Stack>
            <Stack gap={2} direction={isTablet ? "column" : "row"}>
              <Controller
                name="isMedsTaken"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControlLabel
                    sx={{ width: "50%" }}
                    control={<Checkbox defaultChecked />}
                    label="Did you take your pills?"
                  />
                )}
              />

              <Controller
                name="isExcercised"
                {...COMMON_PROPS}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormControlLabel
                    sx={{ width: "50%" }}
                    control={<Checkbox defaultChecked />}
                    label="Did you exercise today?"
                  />
                )}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default CreatingReading;
