import React from "react";
import CreatableSelect from "react-select/creatable";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@apollo/client";
import { GET_ALL_FOODS } from "../graphql/queries";
import { colors } from "../constants";
import { mealTypeKeyVsMealTypeDescrMap } from "../utils";

const MultiSelectBox = ({
  selectedMultiValue,
  handleOnMultiSelectInputChange,
  handleOnMultiSelectChange,
  handleOnCreateFood,
  readingType,
}) => {
  const { data, loading: isFetchFoodsLoading } = useQuery(GET_ALL_FOODS);

  if (isFetchFoodsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CreatableSelect
      isMulti
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e._id}
      value={selectedMultiValue}
      options={data?.getAllFoods}
      onInputChange={handleOnMultiSelectInputChange}
      onChange={handleOnMultiSelectChange}
      onCreateOption={handleOnCreateFood}
      placeholder={
        <div>
          What did you have for your{" "}
          {mealTypeKeyVsMealTypeDescrMap[readingType]}?
        </div>
      }
      styles={{
        option: (styles, state) => ({
          ...styles,
          cursor: "pointer",
          fontFamily: "Roboto",
          fontSize: "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
          backgroundColor: state.isSelected ? colors.lightGrey : colors.white,
        }),
        multiValue: (styles) => ({
          ...styles,
          paddingTop: "8px",
          paddingBottom: "8px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "8px",
          fontSize: "18px",
          margin: "2px 4px",
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          marginLeft: "4px",
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          height: "auto",
          width: "100%",
          fontSize: "16px",
          cursor: "pointer",
          fontFamily: "Roboto",
          border: `1px solid ${colors.darkGrey}`,
          borderRadius: "8px",
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          height: "auto",
          paddingTop: state.hasValue ? "6px" : "12px",
          paddingBottom: state.hasValue ? "6px" : "12px",
          paddingLeft: state.hasValue ? "8px" : "12px",
          fontSize: "16px",
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          width: "100%",
          fontFamily: "Roboto",
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          fontSize: "16px",
          fontFamily: "Roboto",
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          margin: "0px",
          marginLeft: "4px",
          fontFamily: "Roboto",
          outline: "none !important",
          border: "none !important",
          boxShadow: "none !important",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
};

export default MultiSelectBox;
