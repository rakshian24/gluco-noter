import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { InitialCreateReadingFormValues, glucoseReadingTypes } from "./helpers";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import CustomInput from "../../components/CustomInput";
import { colors, screenSize } from "../../constants";
import MultiSelectBox from "../../components/MultiSelectBox";
import { useMutation } from "@apollo/client";
import { CREATE_FOOD_MUTATION, CREATE_READING } from "../../graphql/mutations";
import { showConsumedFoodsTagBox, textInputRegex } from "../../utils";

const CreatingReading = () => {
  const [selectedMultiValue, setSelectedMultiValue] = useState([]);
  const [, setMultiSelectInputVal] = useState("");

  const [createFood] = useMutation(CREATE_FOOD_MUTATION);
  const [createReading] = useMutation(CREATE_READING);

  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: { ...InitialCreateReadingFormValues },
    mode: "onChange",
  });

  const readingType = watch("type");

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);

  const handleOnMultiSelectInputChange = (value) => {
    setMultiSelectInputVal(value);
  };

  const handleOnMultiSelectChange = (value) => {
    setSelectedMultiValue(value);
  };

  const handleOnCreateFood = async (query) => {
    await createFood({
      variables: {
        foodInput: { value: query, label: query },
      },
    });
  };

  const onSubmitHandler = async (formValues) => {
    const consumedFoodIds = selectedMultiValue.map((item) => item._id);

    await createReading({
      variables: {
        ...formValues,
        reading: parseInt(formValues.reading, 10),
        consumedFoods: JSON.stringify([...consumedFoodIds]),
      },
    });
  };

  return (
    <Stack gap={3} sx={{ minWidth: isTablet ? "100%" : "1000px" }}>
      <Typography fontSize={20} fontWeight={500}>
        Create glucose reading
      </Typography>
      <Stack>
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
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
              <FormControlLabel
                label="Did you take your pills?"
                sx={{ width: "50%" }}
                control={
                  <Controller
                    name="isMedsTaken"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                }
              />

              <FormControlLabel
                label="Did you exercise today?"
                sx={{ width: "50%" }}
                control={
                  <Controller
                    name="isExercised"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                }
              />
            </Stack>
            {showConsumedFoodsTagBox(readingType) && (
              <Stack gap={"4px"}>
                <MultiSelectBox
                  selectedMultiValue={selectedMultiValue}
                  handleOnMultiSelectInputChange={
                    handleOnMultiSelectInputChange
                  }
                  handleOnMultiSelectChange={handleOnMultiSelectChange}
                  handleOnCreateFood={handleOnCreateFood}
                  readingType={readingType}
                />
                <Typography
                  sx={{
                    px: 1,
                    color: colors.contentSecondary,
                    fontSize: "12px",
                  }}
                >
                  Consumed foods
                </Typography>
              </Stack>
            )}
            <Stack>
              <Controller
                name="description"
                {...COMMON_PROPS}
                rules={{
                  required: false,
                  pattern: {
                    value: textInputRegex,
                    message: "Special characters are not allowed.",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    {...field}
                    type="text"
                    error={error !== undefined}
                    styles={{ width: "100%" }}
                    placeholder="Enter description"
                    label="Description"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack mt={2} flexDirection={"row"} justifyContent={"flex-end"}>
            <Button
              onClick={() => onSubmitHandler}
              variant="contained"
              type="submit"
              sx={{ width: "160px" }}
            >
              Add Reading
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default CreatingReading;
