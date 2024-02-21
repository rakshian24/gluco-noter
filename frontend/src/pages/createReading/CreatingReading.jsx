import {
  Backdrop,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { InitialCreateReadingFormValues, glucoseReadingTypes } from "./helpers";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../components/CustomSelect";
import CustomInput from "../../components/CustomInput";
import { ROUTES, colors, screenSize } from "../../constants";
import MultiSelectBox from "../../components/MultiSelectBox";
import { useMutation } from "@apollo/client";
import { CREATE_FOOD_MUTATION, CREATE_READING } from "../../graphql/mutations";
import {
  isValueValid,
  joinStringsAndConjunctionateLastWord,
  mealTypeKeyVsMealTypeDescrMap,
  readingTypeKeyVsDescMap,
  showConsumedFoodsTagBox,
  showInsulinUnitsField,
  textInputRegex,
} from "../../utils";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { GET_ALL_FOODS, GET_ALL_READINGS } from "../../graphql/queries";

const CreatingReading = ({ userInfo }) => {
  const [selectedMultiValue, setSelectedMultiValue] = useState([]);
  const [, setMultiSelectInputVal] = useState("");

  const [createFood, { loading: isFoodCreateLoading }] =
    useMutation(CREATE_FOOD_MUTATION);
  const [createReading, { loading: isCreateReadingLoading }] =
    useMutation(CREATE_READING);
  const navigate = useNavigate();

  const { control, formState, handleSubmit, watch, getValues, setValue } =
    useForm({
      defaultValues: { ...InitialCreateReadingFormValues },
      mode: "onChange",
    });

  const readingType = watch("type");
  const reading = watch("reading");

  const { errors } = formState;
  const COMMON_PROPS = { control: control, errors: errors };
  const isTablet = useMediaQuery(`(max-width:${screenSize.tablet})`);
  const isMobile = useMediaQuery(`(max-width:${screenSize.mobile})`);

  useEffect(() => {
    if (!showConsumedFoodsTagBox(readingType)) {
      setValue("description", "");
    }
  }, [readingType, setValue]);

  useEffect(() => {
    if (isValueValid(readingType) && parseInt(reading, 10) > 0) {
      let descriptionText = `My blood sugar level, ${readingTypeKeyVsDescMap[
        readingType
      ]?.toLowerCase()} is ${reading} mg/dL.`;

      if (showConsumedFoodsTagBox(readingType) && selectedMultiValue.length) {
        const consumedFoodsArr = selectedMultiValue.map((food) => food.value);
        descriptionText = `${descriptionText} I had ${joinStringsAndConjunctionateLastWord(
          consumedFoodsArr
        )} for the ${mealTypeKeyVsMealTypeDescrMap[readingType]}.`;
      }
      setValue("description", descriptionText);
    }
  }, [
    getValues,
    reading,
    readingType,
    selectedMultiValue,
    setValue,
    userInfo?.username,
  ]);

  const handleOnMultiSelectInputChange = (value) => {
    setMultiSelectInputVal(value);
  };

  const handleOnMultiSelectChange = (value) => {
    setSelectedMultiValue(value);
  };

  const handleOnCreateFood = async (query) => {
    const { data } = await createFood({
      variables: {
        foodInput: { value: query, label: query },
      },
      refetchQueries: [{ query: GET_ALL_FOODS }],
    });
    setSelectedMultiValue([...selectedMultiValue, data?.createFood]);
  };

  const onSubmitHandler = async (formValues) => {
    const consumedFoodIds = selectedMultiValue.map((item) => item._id);

    const { data } = await createReading({
      variables: {
        ...formValues,
        reading: parseInt(formValues.reading, 10),
        insulinUnits: parseInt(formValues.insulinUnits, 10),
        consumedFoods: JSON.stringify([...consumedFoodIds]),
      },
      refetchQueries: [{ query: GET_ALL_READINGS }],
    });

    if (data?.createGlucoseReading?._id) {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <Stack gap={3} sx={{ minWidth: isTablet ? "100%" : "1000px" }}>
      <Typography fontSize={20} fontWeight={500}>
        Create glucose reading
      </Typography>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFoodCreateLoading || isCreateReadingLoading}
      >
        <LoadingSpinner />
      </Backdrop>
      <Stack>
        <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack gap={2}>
            <Stack gap={2} direction={isMobile ? "column" : "row"}>
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
            <Stack
              gap={isTablet ? 1 : 2}
              direction={isTablet ? "column" : "row"}
            >
              <FormControlLabel
                label="Did you take your pills?"
                sx={{ width: isTablet ? "100%" : "50%" }}
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
                label="Did you exercise?"
                sx={{ width: isTablet ? "100%" : "50%" }}
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
            {showInsulinUnitsField(readingType) && (
              <Stack width={isTablet ? "100%" : "50%"}>
                <Controller
                  name="insulinUnits"
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
                      placeholder="Enter insulin units"
                      label="Insulin units"
                    />
                  )}
                />
              </Stack>
            )}
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
          <Stack mt={1} flexDirection={"row"} justifyContent={"flex-end"}>
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
