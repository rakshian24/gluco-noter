import moment from "moment";

export const InitialCreateReadingFormValues = {
  type: "",
  reading: "",
  isMedsTaken: false,
  isExercised: false,
  insulinUnits: 0,
  consumedFoods: [],
  description: "",
  createdAt: moment(new Date()),
};

export const glucoseReadingTypes = [
  {
    id: 1,
    key: "BB",
    description: "Before breakfast",
  },
  {
    id: 2,
    key: "AB",
    description: "After breakfast",
  },
  {
    id: 3,
    key: "BL",
    description: "Before lunch",
  },
  {
    id: 4,
    key: "AL",
    description: "After lunch",
  },
  {
    id: 5,
    key: "BD",
    description: "Before dinner",
  },
  {
    id: 6,
    key: "AD",
    description: "After dinner",
  },
];
